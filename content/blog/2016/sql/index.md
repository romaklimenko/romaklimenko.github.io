---
title: "The Structured (English) Query Language"
date: "2016-12-14"
tags: ["sql"]
---

This is just a small observation about one counterintuitive feature of the SQL language.
SQL (Structured Query Language) was initially named [SEQUEL](https://en.wikipedia.org/wiki/SQL#History) (Structured _English_ Query Language). One word clearly explains why the “keyed-in” SQL statements order is different than the logical query processing order.

Say, we’d like to ask someone for a bottle of beer from a fridge. The first thing we think about is _what_ do we want (a beer) and only then _how_ to get it (from the fridge).

In English, we’d say:

> Give me a bottle of beer from the fridge, please.

First, _what_ do we want, second, _how_ to get it.

But if we wrote a program, we want to make an algorithm: first — *how*, second — *what*:

> Open the fridge, take a bottle of beer.

The so-called “[keyed-in order](https://msdn.microsoft.com/en-us/library/ms189499.aspx#Anchor_2)” of a standard SQL query is:

1. `SELECT`
2. `FROM`
3. `WHERE`
4. `GROUP BY`
5. `HAVING`
6. `ORDER BY`

But the logical query processing order is different:

1. `FROM`
2. `WHERE`
3. `GROUP BY`
4. `HAVING`
5. `SELECT`
6. `ORDER BY`

This is why we can’t, for example, refer in the `WHERE` clause to a column alias defined in the `SELECT` clause. This isn't allowed because the `WHERE` clause is evaluated before the `SELECT` clause.

Now take a classic SQL query:

```sql
SELECT Country, YEAR(HireDate) AS YearHired, COUNT(*) AS NumEmployees
FROM Employees
WHERE HireDate >= '19920101'
GROUP BY Country, YEAR(HireDate)
HAVING COUNT(*) > 1
ORDER BY Country, YearHired DESC
```

And compare to it’s LINQ-expression equivalent:

```csharp
var result =  from e in Employees
              where e.HireDate >= new DateTime(1992, 1, 1)
              group e by e.Country into g
              where g.Count() > 1
              orderby g.Key descending
              select new { g.Key, Count = g.Count() };
```

The `select` at the last line looks more natural, isn't it?

Of course, `orderby` goes before the `select`, but this is exactly how it is processed in the LINQ code:

```csharp
var result2 = Employees
    .Where(e => e.HireDate >= new DateTime(1992, 1, 1))
    .GroupBy(e => e.Country)
    .Where(g => g.Count() > 1)
    .OrderByDescending(g => g.Key)
    .Select(g => new { g.Key, Count = g.Count() });
```
