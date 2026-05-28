import { Meta, StoryObj } from '@storybook/web-components';
type ModalArgs = {
    open: boolean;
    'aria-label': string;
};
declare const meta: Meta<ModalArgs>;
export default meta;
type Story = StoryObj<ModalArgs>;
export declare const Open: Story;
export declare const Closed: Story;
