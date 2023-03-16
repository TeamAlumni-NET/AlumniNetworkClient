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
      createNewGroup: "Create new group",
      member: "Member",
      private: "Private",
    },
    topicList: {
      title: "Topic List",
      createNewTopic: "Create new topic",
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
      createNewGroup: "Luo uusi ryhmä",
      member: "Jäsen",
      private: "Yksityinen",
    },
    topicList: {
      title: "Aihe listaus",
      createNewTopic: "Luo uusi aihe",
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
  },
})
