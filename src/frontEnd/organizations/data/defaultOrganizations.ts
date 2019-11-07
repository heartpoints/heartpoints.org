import { Organization } from "./organization";

export const defaultOrganizations:Array<Organization> = [
    {
        href: "/organizations/1",
        imageThumbnailURL: "/images/aclu-logo.gif",
        title: 'ACLU',
        mission: 'The American Civil Liberties Union (ACLU) is a nonprofit organization whose stated mission is "to defend and preserve the individual rights and liberties guaranteed to every person in this country by the Constitution and laws of the United States."',
        homepage: "https://www.aclu.org",
        creatorEmail: "ptmetsch@gmail.com",
        volOpportunities: [
            {
                jobID: '11',
                jobTitle: 'Job AA',
                jobDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            },
            {
                jobID: '12',
                jobTitle: 'Job AB',
                jobDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, se'
            }
        ]
    },
    {
        href: "/organizations/2",
        imageThumbnailURL: "/images/billAndMelindaGatesFoundation.png",
        title: 'Bill & Melinda Gates Foundation',
        mission: 'Guided by the belief that every life has equal value, the Bill & Melinda Gates Foundation works to help all people lead healthy, productive lives. In developing countries, it focuses on improving people\'s health and giving them the chance to lift themselves out of hunger and extreme poverty.',
        homepage: "https://www.gatesfoundation.org",
        creatorEmail: "tom@tommysullivan.me",
        volOpportunities: [
            {
                jobID: '21',
                jobTitle: 'Opportunity 1',
                jobDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            },
            {
                jobID: '22',
                jobTitle: 'Job 2',
                jobDescription: 'Opportunity 2 description'
            },
            {
                jobID: '23',
                jobTitle: 'Opportunity 3',
                jobDescription: 'Opportunity 3 description'
            }
        ]
    },
    {
        href: "/organizations/3",
        imageThumbnailURL: "/images/heartpointsIcon.png",
        title: 'Heartpoints.org',
        mission: 'Heartpoints.org and its members understand that today\'s currencies all have one thing in common: their value derives from exploitation. Our mission is to bring about a "currency of good" whose value is linked to the health and well-being of every individual on Earth; and whose exchange is fundamentally enabled by open-source blockchain technologies that enable unprecedented, decentralized traceability into the ethics of each transaction in the supply chain of any product or service traded within the heartpoints ecosystem',
        homepage: "http://www.heartpoints.org",
        creatorEmail: "tsullivan@heartpoints.org",
        volOpportunities: [
            {
                jobID: '31',
                jobTitle: 'Job 3',
                jobDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
        ]
    },
    {
        href: "/organizations/4",
        imageThumbnailURL: "/images/stAnthonys.jpeg",
        title: 'St. Anthony\'s - San Francisco',
        mission: 'St. Anthony’s mission is to feed, heal, shelter, clothe, lift the spirits of those in need, and create a society in which all persons flourish. This mission is guided by five values: healing, community, personalism, justice, and gratitude.',
        homepage: "https://www.stanthonysf.org",
        creatorEmail: "tastulae@mail.usf.edu",
        volOpportunities: [
            {
                jobID: '41',
                jobTitle: 'Job 1',
                jobDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            },
            {
                jobID: '42',
                jobTitle: 'Opportunity 2',
                jobDescription: ''
            }
        ]
    },
    {
        href: "/organizations/5",
        imageThumbnailURL: "/images/heartpointsIcon.png",
        title: "Organization without Opportunities",
        mission: "To test that organizations without opportunities do not throw an error.",
        homepage: "https://www.google.com",
        creatorEmail: "ptmetsch@gmail.com",
        volOpportunities: []
    }
];