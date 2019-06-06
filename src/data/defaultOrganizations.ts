import { Organization } from "../models/organization";

export const defaultOrganizations:Array<Organization> = [
    {
        href: "/organizations/1",
        imageThumbnailURL: "/images/demo_icon.png",
        title: 'Heartpoints',
        statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        organizationURL: "https://heartpoints.org"
    },
    {
        href: "/organizations/2",
        imageThumbnailURL: "/images/demo_icon.png",
        title: 'Example Non Profit',
        statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
        organizationURL: "https://google.com"
    },
    {
        href: "/organizations/3",
        imageThumbnailURL: "/images/demo_icon.png",
        title: 'Some Organization',
        statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo',
        organizationURL: "https://bing.com"
    },
    {
        href: "/organizations/4",
        imageThumbnailURL: "/images/demo_icon.png",
        title: 'Altruistic Company',
        statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
        organizationURL: "https://yahoo.com"
    }
];