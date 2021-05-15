import { ApplicationInsights } from "@microsoft/applicationinsights-web"
import { ReactPlugin } from "@microsoft/applicationinsights-react-js"
import { createBrowserHistory } from "history"

const reactPlugin = new ReactPlugin()
const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: "e55a8590-3f3b-4628-8475-f5cf5b420435",
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: { history: typeof window !== "undefined" ? createBrowserHistory({ basename: "" }) : null },
    }
  },
})

const filterURLs = envelope => {
  if (envelope.baseData.name.endsWith("app-data.json") || envelope.baseData.name.endsWith("page-data.json")) {
    return false;
  }

  return true;
}

appInsights.loadAppInsights();
appInsights.addTelemetryInitializer(filterURLs);

export { reactPlugin, appInsights }
