---
title: "Running Sitecore in Docker"
date: "2016-10-29"
tags: ["sitecore", "docker"]
---

_Warning: this post is obsolete. Please read this one instead: [http://blog.martinmiles.net/post/starting-with-docker-and-sitecore](http://blog.martinmiles.net/post/starting-with-docker-and-sitecore)_

<img src="docker.png" class="img-fluid" />

## Motivation

> Docker containers wrap a piece of software in a complete filesystem that contains everything needed to run: code, runtime, system tools, system libraries — anything that can be installed on a server. This guarantees that the software will always run the same, regardless of its environment.
>
> — [https://www.docker.com/what-docker](https://www.docker.com/what-docker)

I was looking forward to Docker support of Windows containers for a long time. Docker [supports](https://www.docker.com/microsoft) Windows containers nowadays and it means we are able to put our Windows applications in containers in order to save a lot of time spent on setting up development, testing, and deployment.

These days Microsoft gives a lot of `Dockerfile` examples so setting up a container for ASP.NET web application is not a pain but a pleasure.

In this article, I am going to show how to perform a very basic setup for [Sitecore Experience Platform 8.2](https://www.sitecore.net/en/products/sitecore-experience-platform).

To set it up, I mixed the following `Dockerfile`s:

- [microsoft/windowsservercore](https://hub.docker.com/r/microsoft/windowsservercore/) — Windows Server 2016 Server Core base OS image for Windows containers.
- [microsoft/mssql-server-2016-express-windows](https://hub.docker.com/r/microsoft/mssql-server-2016-express-windows/) — Microsoft SQL Server 2016 Express.
- [microsoft/iis](https://hub.docker.com/r/microsoft/iis/) — Internet Information Services (IIS).

## Setup

There are many options how to install Sitecore Experience Platform. For the very basic demo setup, we will need the following:

- [ZIP archive](https://dev.sitecore.net/Downloads/Sitecore_Experience_Platform/82/Sitecore_Experience_Platform_82_Initial_Release.aspx#) of the Sitecore site root folder.
- A Sitecore license (I hope you have got one).
- Microsoft SQL Server installer. You can get it from [here](https://go.microsoft.com/fwlink/?linkid=829176) (Microsoft SQL Express 2016).
- You’ll need to run Windows 10 or Windows Server 2016 on your PC or laptop.

Once you have all these, we can go further.

## Docker setup

Follow [this](https://msdn.microsoft.com/virtualization/windowscontainers/quick_start/quick_start_windows_10) article to setup Docker on Windows. If you already have Docker installed, please, verify the version of dockerd service. I have spent some time trying to figure out that the version of the dockerd service on my machine is not the same as I just installed. Quick check – you should be able to pull Windows containers like that:

`docker pull microsoft/windowsservercore`

And here are the first step to start building a Sitecore container:

- Create a folder for our container (i.e. `C:\docker`).
- Create a `Dockerfile` in the folder we just created.
- Start our `Dockerfile` by specifying the Base Image for our container:

```Dockerfile
FROM microsoft/windowsservercore
```

## Files

I put Sitecore files just in the same way as for local quick setup. The structure is like that:

```yml
docker
sitecore
Databases
...
Website
...
Data
license.xml
...
```

I will not dive deep into Sitecore configuration. You just need to place files as you usually do when you setup your Sitecore instances. Remember about `ConnectionStrings.config` and a path to `license.xml`. Don't attach the databases.

Add to our `Dockerfile` the following lines to make the files available in the container:

```Dockerfile
COPY . /
WORKDIR /
```

## Microsoft SQL

Now we need to set up Microsoft SQL Server. Add to the `Dockerfile` a following line:

```
RUN SQLEXPR_x64_ENU.exe /qs /x:setup && /setup/setup.exe /q /ACTION=Install /INSTANCENAME=SQLEXPRESS /FEATURES=SQLEngine /UPDATEENABLED=0 /SQLSVCACCOUNT="NT AUTHORITY\System" /SQLSYSADMINACCOUNTS="BUILTIN\ADMINISTRATORS" /TCPENABLED=1 /NPENABLED=0 /IACCEPTSQLSERVERLICENSETERMS && del /F /Q SQLEXPR_x64_ENU.exe && rd /q /s setup
```

Remember, [SQLEXPR_x64_ENU.exe](https://go.microsoft.com/fwlink/?linkid=829176) must be at the root of our folder, like: `C:\docker\SQLEXPR_x64_ENU.exe`.

Next, I run a PowerShell script to enable `sa` account, change the password and attach databases. Add the following line to our Dockerfile:

```Dockerfile
RUN powershell ./sql.ps1 -Verbose
```

Here is `sql.ps1`:

```powershell
# See also:
#   - https://github.com/Microsoft/sql-server-samples/tree/master/samples/manage/windows-containers/mssql-server-2016-express-windows

Set-StrictMode -Version latest ;

Stop-Service MSSQL`$SQLEXPRESS ;

Set-ItemProperty -Path 'HKLM:\software\microsoft\microsoft sql server\mssql13.SQLEXPRESS\mssqlserver\supersocketnetlib\tcp\ipall' -Name tcpdynamicports -Value '' ;
Set-ItemProperty -Path 'HKLM:\software\microsoft\microsoft sql server\mssql13.SQLEXPRESS\mssqlserver\supersocketnetlib\tcp\ipall' -Name tcpport -Value 1433 ;
Set-ItemProperty -Path 'HKLM:\software\microsoft\microsoft sql server\mssql13.SQLEXPRESS\mssqlserver' -Name LoginMode -Value 2 ;

Start-Service MSSQL`$SQLEXPRESS ;

Invoke-Sqlcmd -Query "ALTER LOGIN sa with password='Str0ng_En0ugh'; ALTER LOGIN sa ENABLE;" -ServerInstance "." ;

Invoke-Sqlcmd -Query "CREATE DATABASE Sitecore_Analytics ON (FILENAME = 'C:\sitecore\Databases\Sitecore.Analytics.mdf'), (FILENAME = 'C:\sitecore\Databases\Sitecore.Analytics.ldf') FOR ATTACH ;" -ServerInstance "." ;
Invoke-Sqlcmd -Query "CREATE DATABASE Sitecore_Core      ON (FILENAME = 'C:\sitecore\Databases\Sitecore.Core.mdf'),      (FILENAME = 'C:\sitecore\Databases\Sitecore.Core.ldf')      FOR ATTACH ;" -ServerInstance "." ;
Invoke-Sqlcmd -Query "CREATE DATABASE Sitecore_Master    ON (FILENAME = 'C:\sitecore\Databases\Sitecore.Master.mdf'),    (FILENAME = 'C:\sitecore\Databases\Sitecore.Master.ldf')    FOR ATTACH ;" -ServerInstance "." ;
Invoke-Sqlcmd -Query "CREATE DATABASE Sitecore_Web       ON (FILENAME = 'C:\sitecore\Databases\Sitecore.Web.mdf'),       (FILENAME = 'C:\sitecore\\Databases\Sitecore.Web.ldf')      FOR ATTACH ;" -ServerInstance "." ;
```

## IIS

In the same way as for Microsoft SQL Server, setup IIS:

```Dockerfile
RUN powershell ./iis.ps1 -Verbose
```

Here is `iis.ps1`:

```powershell
# See also:
#   - https://github.com/microsoft/iis-docker/blob/master/windowsservercore/Dockerfile
#   - https://github.com/microsoft/aspnet-docker/blob/master/4.6.2/Dockerfile

Add-WindowsFeature Web-Server
Add-WindowsFeature NET-Framework-45-ASPNET
Add-WindowsFeature Web-Asp-Net45

C:\Windows\System32\inetsrv\appcmd.exe delete site "default web site"

C:\Windows\System32\inetsrv\appcmd.exe add site /name:Sitecore /bindings:http/*:80: /physicalPath:c:\sitecore\Website

C:\Windows\System32\inetsrv\appcmd.exe start site Sitecore

iisreset
```

## Build

Now we have all we need to build an image. Here’s our final `Dockerfile`:

```Dockerfile
FROM microsoft/windowsservercore

LABEL Description="Sitecore 8.2 rev. 160729" Vendor="Sitecore" Version="8.2 rev. 160729"

# Adding the files
COPY . /
WORKDIR /

# Installing MS SQL Server
RUN SQLEXPR_x64_ENU.exe /qs /x:setup && /setup/setup.exe /q /ACTION=Install /INSTANCENAME=SQLEXPRESS /FEATURES=SQLEngine /UPDATEENABLED=0 /SQLSVCACCOUNT="NT AUTHORITY\System" /SQLSYSADMINACCOUNTS="BUILTIN\ADMINISTRATORS" /TCPENABLED=1 /NPENABLED=0 /IACCEPTSQLSERVERLICENSETERMS && del /F /Q SQLEXPR_x64_ENU.exe && rd /q /s setup

# Setting up MS SQL Server and attaching databases
RUN powershell ./sql.ps1 -Verbose

# Setting up IIS and adding the website
RUN powershell ./iis.ps1 -Verbose

EXPOSE 80
```

To build an image, let’s create a `build.bat` file in our folder (`C:\docker`) with following content:

```shell
docker build -t sitecore %~dp0
```

Run this file and wait for the build to complete. Then, if we run docker images we shall see the sitecoreimage. Now let's use it!

## Create a container and run it

To create containers from our image run a command like this:

```shell
docker run --name sitecore -p 80:80 -it sitecore powershell
```

This will log you into powershell console on your Docker container. Run ping sitecore to find an IP-address of our Sitecore instance:

```shell
Pinging 172.26.102.196 with 32 bytes of data
```

Add to `C:\Windows\System32\drivers\etc\hosts` file a following line:

```
172.26.102.196 sitecore
```

Open [http://sitecore/](http://sitecore/) in a browser, it should look like this:

<img src="sitecore.png" class="img-fluid" />

This is it! In the same way, we can setup Mongo and Solr.
