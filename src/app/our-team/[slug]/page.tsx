import { BlockRenderer, TeamPageBlock } from "@/app/components/blocks";
import { fetchApi } from "@/app/utils/fetch";

interface MemberData<T>{
    data: T[];
    meat: {
        pagination:{
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

async function getTeamMember(slug: string) {
    const res = await fetchApi<MemberData<UserProfile>>("/api/team-members", {}, {
        photo: {
            fields: ["alternativeText", "name", "url"],
        },
        blocks: {
            on: {
                "blocks.testimonial": {
                    populate: {
                        photo: {
                            fields: ["alternativeText", "name", "url"],
                        },
                    },
                },
                "blocks.spoiler": {
                    populate: true,
                },
                "blocks.rich-text": {
                    populate: true,
                },
            }
        }
    },
        { slug: { $eq: slug } });

    console.log("Filtered Response:", res);

    if (!res?.data?.data) {
        throw new Error("Invalid API response structure");
    }

    return res.data.data.length > 0 ? res.data.data[0] : null;
}

interface UserProfile {
    id: number;
    documentId: string;
    name: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
    photo: {
        id: number;
        alternativeText: string;
        name: string;
        url: string;
    };
    blocks: TeamPageBlock[];
}

export default async function TeamMemberDetail({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = params;

    if (!slug) return <p>No member found</p>;

    const teamMember = (await getTeamMember(slug)) as UserProfile;

    return (
        <div>
            {teamMember.blocks.map((block: TeamPageBlock) => (
                <BlockRenderer key={block.id} block={block} />
            ))}
        </div>
    );
}