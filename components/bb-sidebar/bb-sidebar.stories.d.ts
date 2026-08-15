import { Meta, StoryObj } from '@storybook/web-components';
declare const meta: Meta;
export default meta;
type Story = StoryObj;
/** No item active (path doesn't match any href) */
export declare const Default: Story;
/** First item active — simulates "/home" route */
export declare const ActiveHome: Story;
/** Second item active — simulates "/extrato" route */
export declare const ActiveExtrato: Story;
/** Minimal two-item sidebar */
export declare const FewItems: Story;
