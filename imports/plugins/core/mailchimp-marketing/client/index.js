import { registerOperatorRoute } from "/imports/client/ui";
import MailchimpLogin from "./components/MailchimpLogin";

registerOperatorRoute({
    group: "navigation",
    MainComponent: MailchimpLogin,
    priority: 80,
    path: "/mailchimp",
    sidebarI18nLabel: "admin.mailchimp"
  });
