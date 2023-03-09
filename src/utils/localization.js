import LocalizedStrings from "react-localization";

export const strings = new LocalizedStrings({
  en: {
    navbar: {
      title: "Network Alumni",
      logout: "Log out",
      navMenuList: ["Timeline", "Groups", "Topics", "Calendar", "Profile"],
    },
    groupList: {
      title: "Group List",
      createNewGroup: "Create new group",
      member: "Member",
      private: "Private",
    },
    topicList: {
      title: "Topic List",
      createNewTopic: "Create new topic",
      member: "Member",
    },
  },
  fi: {
    navbar: {
      title: "Network Alumni",
      logout: "Kirjaudu ulos",
      navMenuList: ["Aikajana", "Ryhmät", "Aiheet", "Kalenteri", "Profiili"],
    },
    groupList: {
      title: "Ryhmä listaus",
      createNewGroup: "Luo uusi ryhmä",
      member: "Jäsen",
      private: "Yksityinen",
    },
    topicList: {
      title: "Ahe listaus",
      createNewTopic: "Luo uusi aihe",
      member: "Jäsen",
    },
  },
});
