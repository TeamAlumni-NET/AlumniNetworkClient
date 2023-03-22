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
      edit: "Edit",
    },
    createPostForm: {
      title: "Create new post",
      postTitle: "Post Title",
      group: "Group",
      topic: "Topic",
      content: "Content",
      none: "None",
      post: "Post!",
      newGroup: "Create New Group",
      newTopic: "Create New Topic"
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
      edit: "Muokkaa",
    },
    createPostForm: {
      title: "Luo uusi viesti",
      postTitle: "Otsikko",
      group: "Ryhmä",
      topic: "Aihe",
      content: "Viesti",
      none: "Tyhjä",
      post: "Julkaise!",
      newGroup: "Luo uusi ryhmä",
      newTopic: "Luo uusi aihe"
    },
  },
})
