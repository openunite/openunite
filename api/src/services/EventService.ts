const dummyResponse = [
  {
    id: 1,
    slug: "nardoz--6--the-importance-of-asking-questions-+-microservices",
    title: "Nardoz #6: The importance of asking questions + Microservices",
    date: new Date().toISOString(),
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
    slug: "nardoz--5--introduction-to-kubernetes",
    title: "Nardoz #5: Introduction to Kubernetes",
    date: new Date().toISOString(),
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
    slug: "nardoz--4--building-a-data-science-project-from-scratch",
    title: "Nardoz #4: Building a Data Science Project From Scratch",
    date: new Date().toISOString(),
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
    slug: "nardoz--3--zalenium-+-code-style-is-dead",
    title: "Nardoz #3: Zalenium + Code Style is Dead",
    date: new Date().toISOString(),
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

class EventService {
  async findAll() {
    return dummyResponse;
  }

  async findOne(slug: string) {
    return dummyResponse.find((event) => event.slug === slug);
  }

  async insert(newEvent: any) {
    const slug =
      newEvent.slug || newEvent.title.toLowerCase().replace(/[^a-z0-9-]/g, "-");

    return { slug };
  }
}

export { EventService };
