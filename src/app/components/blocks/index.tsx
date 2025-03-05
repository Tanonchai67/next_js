import { RichTextBlock } from "./rich-text-block";
import { TestimonialBlock } from "./testimonial-block";
import { SpoilerBlock } from "./spoiler-block";

type TeamPageBlock = SpoilerBlock | TestimonialBlock | RichTextBlock;

const blocks: Record<
    TeamPageBlock["__component"],
    React.ComponentType<{ block: TeamPageBlock }>
> = {
    "blocks.spoiler": ({ block }: { block: TeamPageBlock }) => (
        <SpoilerBlock block={block as SpoilerBlock} key={"spoiler"+block.id}/>
    ),
    "blocks.testimonial": ({ block }: { block: TeamPageBlock }) => (
        <TestimonialBlock block={block as TestimonialBlock} key={"testimonial"+block.id} />
    ),
    "blocks.rich-text": ({ block }: { block: TeamPageBlock }) => (
        <RichTextBlock block={block as RichTextBlock} key={"rich-text"+block.id}/>
    ),
};

function BlockRenderer({ block }: { block: TeamPageBlock }) {
    const BlockComponent = blocks[block.__component];
    return BlockComponent ? <BlockComponent block={block} /> : null;
}

export { BlockRenderer };
export type { TeamPageBlock };
