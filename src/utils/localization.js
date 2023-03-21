import LocalizedStrings from "react-localization"

export const strings = new LocalizedStrings({
  en: {
    login: {
      logoUrl: "/media/logo/AlumniNetworkEn/png/logo-no-background.png",
    },
    navbar: {
      title: "Network Alumni",
      login: "Log in",
      logout: "Log out",
      navMenuList: ["Timeline", "Groups", "Topics", "Calendar", "Profile"],
    },
    groupList: {
      title: "Group List",
      createNew: "Create new group",
      member: "Member",
      private: "Private",
    },
    topicList: {
      title: "Topic List",
      createNew: "Create new topic",
      member: "Member",
    },
    profilePage: {
      firstName: "Firstname",
      lastName: "Lastname",
      userStatus: "Status",
      funFact: "Fun Fact",
      bio: "Bio",
      pictureUrl: "Profilepicture's URL",
    },
    common: {
      edit: "Edit",
      create: "Create",
      save: "Save",
      submit: "Submit",
      close: "Close"

    },
    timeline: {
      calendar: "Calendar",
      title: "Timeline",
      createNew: "Create new post",
      search: "Search",
      group: "In group: ",
      topic: "In topic: ",
      startingAt: "Starting at: ",
    }
  },
  fi: {
    login: {
      logoUrl: "/media/logo/AlumniNetworkFi/png/logo-no-background.png",
    },
    navbar: {
      title: "Network Alumni",
      login: "Kirjaudu sisään",
      logout: "Kirjaudu ulos",
      navMenuList: ["Aikajana", "Ryhmät", "Aiheet", "Kalenteri", "Profiili"],
    },
    groupList: {
      title: "Ryhmä listaus",
      createNew: "Luo uusi ryhmä",
      member: "Jäsen",
      private: "Yksityinen",
    },
    topicList: {
      title: "Aihe listaus",
      createNew: "Luo uusi aihe",
      member: "Jäsen",
    },
    profilePage: {
      firstName: "Etunimi",
      lastName: "Sukunimi",
      userStatus: "Status",
      funFact: "Hauska fakta",
      bio: "kuvaus",
      pictureUrl: "Profiilikuvan URL",
    },
    common: {
      edit: "Muokkaa",
      create: "Luo",
      save: "Tallenna",
      submit: "Julkaise",
      close: "Sulje"

    },
    timeline: {
      calendar: "Kalenteri",
      title: "Aikajana",
      createNew: "Luo uusi postaus",
      search: "Etsi",
      group: "Ryhmässä: ",
      topic: "Aiheessa: ",
      startingAt: "Alkaa:",
    }
  },
})
