import LocalizedStrings from "react-localization"

export const strings = new LocalizedStrings({
  en: {
    navbar:{
      logout: "Log out"
    },
    groupList: {
      title: "Group List",
      createNewGroup: "Create new group",
      member: "Member",
      private: "Private"
    },
    topicList: {
      title: "Topic List",
      createNewTopic: "Create new topic",
      member: "Member",
    }
    
  },
  fi: {
    navbar:{
      logout: "Kirjaudu ulos",
    },
    groupList: {
      title: "Ryhmä listaus",
      createNewGroup: "Luo uusi ryhmä",
      member: "Jäsen",
      private: "Yksityinen"
    },
    topicList: {
      title: "Ahe listaus",
      createNewTopic: "Luo uusi aihe",
      member: "Jäsen",
    }
  }
})