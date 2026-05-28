import { Meta, StoryObj } from '@storybook/web-components';
declare const meta: Meta;
export default meta;
type CardArgs = {
    title: string;
    content: string;
    size: string;
};
type Story = StoryObj<CardArgs>;
export declare const Default: Story;
export declare const Small: Story;
export declare const Large: Story;
