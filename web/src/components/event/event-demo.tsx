import moment from "moment";

export interface Group {
  id: number;
  name: string;
}

export interface GroupEvent {
  id: number;
  title: string;
  slug: string;
  date: any;
  attendees: number;
  description: string;
  group: Group;
}

export const demoData: GroupEvent[] = [
  {
    id: 1,
    title: "Nardoz #6: The importance of asking questions + Microservices",
    slug: "",
    date: moment(),
    attendees: 9,
    description: `
      It's time for a new Nardoz! 🎉 AGENDA 18.30 - Arrival, networking 19.00 - 
      The importance of asking questions - Daniela Fedyakin, full-stack developer
      The questions you ask shape the knowledge you get. We all hear that communication 
      is the key and the solution to almost everything, but when it comes to learning, ...
    `,
    group: {
      id: 1,
      name: "Nardoz Berlin"
    }
  },
  {
    id: 2,
    title: "Nardoz #5: Introduction to Kubernetes",
    slug: "",
    date: moment(),
    attendees: 13,
    description: `
      Raffaele will give us an introduction to Kubernetes 
      (including a quick and small catch up on Containers if needed), 
      going through its architecture, main concepts, hands-on demos and 
      real world examples of production deployments.
      `,
    group: {
      id: 1,
      name: "Nardoz Berlin"
    }
  },
  {
    id: 3,
    title: "Nardoz #4: Building a Data Science Project From Scratch",
    slug: "",
    date: moment(),
    attendees: 18,
    description: `
      What we'll do
      Jekaterina Kokatjuhha will showcase her Berlin Rental Prices project, 
      going through all the steps of a short-term data science project: 
      motivation, extraction of data from the web, cleaning and engineering 
      of features using external APIs, storytelling, and building machine 
      learning models.
    `,
    group: {
      id: 1,
      name: "Nardoz Berlin"
    }
  },
  {
    id: 4,
    title: "Nardoz #3: Zalenium + Code Style is Dead",
    slug: "",
    date: moment(),
    attendees: 23,
    description: `
      Agenda: 18.45 - 19.30: Grab a beer and something to eat + intro. 
      19.30 - 20.15: Zalenium, by Diego Molina * What is Selenium & Selenium Grid?
      * Why Zalenium? What is Zalenium? * How it works * Demo
    `,
    group: {
      id: 1,
      name: "Nardoz Berlin"
    }
  }
];
