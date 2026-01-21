import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const ACADEMIC_BENEFICIARIES: ClassValue[] = [
    {
        name: "Udeh Harrison",
        yearJoined: 2023,
        grant: "Tertiary",
        schoolName: "UNEC",
        course: "Law",
        gender: "Male",
        img: "/scholars/ndu_mau.JPG"
    },
    {
        name: "Uchechukwu Treasure",
        yearJoined: 2023,
        class: "100 L",
        grant: "Tertiary",
        schoolName: "ESUT",
        course: "Law",
        gender: "Female",
        img: "/scholars/uche_treasure.JPG"
    },
    {
        name: "Anude Chiamaka",
        yearJoined: 2024,
        class: "100 L",
        grant: "Tertiary",
        schoolName: "ESUT",
        course: "Nursing Science",
        gender: "Female",
        img: "/scholars/anude_chiamaka.JPG"
    },
    {
        name: "Azor Kingsley",
        yearJoined: 2024,
        class: "100 L",
        grant: "Tertiary",
        schoolName: "ESUT",
        course: "Nursing Science",
        gender: "Female",
        img: "/scholars/azor_kingsley.JPG"
    },
    {
        name: "Okolie Dorcas Amarachi",
        yearJoined: 2024,
        class: "200 L",
        grant: "Tertiary",
        schoolName: "UNIZIK",
        course: "Mathematics",
        gender: "Female",
        img: "/scholars/okolie.JPG"
    },
    {
        name: "Okechineke Precious",
        yearJoined: 2024,
        class: "100 L",
        grant: "Tertiary",
        schoolName: "UNIZIK",
        course: "Computer Science",
        gender: "Female",
        img: "/scholars/okechineke_precious.JPG"
    },
    {
        name: "Ikechukwu Nwafor Moses",
        yearJoined: 2024,
        class: "100 L",
        grant: "Tertiary",
        schoolName: "ESUT",
        course: "Civil Engineering",
        gender: "Female",
        img: "/scholars/ikechukwu_nwafor.JPG"
    },
    {
        name: "Nwankwo Miracle",
        yearJoined: 2024,
        class: "100 L",
        grant: "Tertiary",
        schoolName: "UNIZIK",
        course: "Law",
        gender: "Female",
        img: "/scholars/nwankwo_miracle.JPG"
    },
]

export const YOUTH_EMPOWERMENT_BENEFICIARIES: ClassValue[] = [
    {
        name: "Ndubuisi Maureen",
        yearJoined: "2023",
        craft: "Business",
        equipmentGiven: "Electronics",
        gender: "Female",
        img: "/empowerment/ndu_mau.jpg"
    },
    {
        name: "Ogbu Favour",
        yearJoined: "2023",
        craft: "Business",
        equipmentGiven: "Tomatoes",
        gender: "Female",
        img: "/empowerment/ogbu_favour.JPG"
    },
    {
        name: "Okolie Samuel",
        yearJoined: "2023",
        craft: "Business",
        equipmentGiven: "Building Materials",
        gender: "Male",
        img: "/empowerment/okolie_samuel.JPG"
    },
    {
        name: "Offor Adaku",
        yearJoined: "2023",
        craft: "Business",
        equipmentGiven: "Crayfish",
        gender: "Female",
        img: "/empowerment/offor_adaku.JPG"
    },
    {
        name: "Udeogu Ikenna",
        yearJoined: "2023",
        craft: "Business",
        equipmentGiven: "Phone Accessories",
        gender: "Male",
        img: "/empowerment/udeogu_ikenna.JPG"
    },
    {
        name: "Okolie Udochukwu",
        yearJoined: "2023",
        craft: "Business",
        equipmentGiven: "Building Materials",
        gender: "Male",
        img: "/empowerment/ogbu_favour.JPG"
    },
    {
        name: "Ani Chinwendu",
        yearJoined: "2023",
        craft: "Business",
        equipmentGiven: "Sewing Accessories",
        gender: "Female",
        img: "/empowerment/ani_chinwendu.JPG"
    },
    {
        name: "Ani Geraldine",
        yearJoined: "2023",
        craft: "Business",
        equipmentGiven: "Fruits",
        gender: "Female",
        img: "/empowerment/ani_geraldine.JPG"
    }
]