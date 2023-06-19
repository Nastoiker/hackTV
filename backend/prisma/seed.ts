import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
const Report: Prisma.ReportVideoCreateInput[] = [
    {
        code: '1',
        message: 'Откровенный контен',
    },
    {
        code: '2',
        message: 'Насилие',
    },
    {
        code: '3',
        message: 'Издевательство над животными',
    },
    {
        code: '4',
        message: 'Оскорбление личности',
    },
    {
        code: '5',
        message: 'Запрещенный товар',
    },
];
const tag: Prisma.TagCreateInput[] = [
    {
        name: 'Популярные',
    },
    {
        name: 'Дешевые',
    },
    {
        name: 'Беспроводные',
    },
    {
        name: 'Скидка',
    },
    {
        name: 'Новые',
    },
    {
        name: 'Флагманы',
    },
];
// const model: Prisma.ModelDeviceCreateInput[] = [
// 	{
// 		name: 'airDots',
// 		secondCategoryId: ''
// 		brandId: '',
// 	},
// 	{
// 		name: 'LP40',
// 		secondCategoryId: ''
// 		brandId: '',
// 	},
// 	{
// 		name: 'ENCO AIR 2',
// 		secondCategoryId: ''
// 		brandId: '',
// 	},
// 	{
// 		name: 'airpods pro',
// 		secondCategoryId: ''
// 		brandId: '',
// 	},
// 	{
// 		name: 'EHS64',
// 		secondCategoryId: ''
// 		brandId: '',
// 	},
// ];
const firrtCategory: Prisma.FirstLevelCategoryCreateInput[] = [
    {
        name: 'Блоги',
        alias: 'blogs',
    },
    {
        name: 'Юмор',
        alias: 'funny',
    },
    {
        name: 'Животные',
        alias: 'animals',
    },
];

// const SecondCategory: Prisma.SecondLevelCategoryCreateInput[] = [
// 	{
// 		name: 'Наушники',
// 		alias: 'headphones',
// 		firstLevelId: '4d2f0720-d963-4ff4-8c95-8a4e111da430',
// 	},
// 	{
// 		name: 'Повербанк',
// 		alias: 'powerbank',
// 		firstLevelId: '4d2f0720-d963-4ff4-8c95-8a4e111da430',
// 	},
// 	{
// 		name: 'Телефоны',
// 		alias: '',
// 		firstLevelId: '4d2f0720-d963-4ff4-8c95-8a4e111da430',
// 	},
// ];
// const userData: Prisma.SecondLevelCategoryCreateInput[] = [
// 	{
// 		id: 'Наушники',
// 		firstLevelId: 1,
// 	},
// 	{
// 		id: 'Повербанк',
// 		firstLevelId: 1
// 	},
// 	{
// 		id: 'Телефоны',
// 		firstLevelId: 1,
// 	},
// ];c

async function main() {
    console.log(`Start seeding ...`);
    for (const u of Report) {
        const user = await prisma.reportVideo.create({
            data: u,
        });
        console.log(`Created user with id: ${user.id}`);
    }
    for (const u of firrtCategory) {
        const user = await prisma.firstLevelCategory.create({
            data: u,
        });
        console.log(`Created user with id: ${user.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
