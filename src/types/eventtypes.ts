interface ButtonProps {
    text: string;
    disabled?: boolean;
    type: ButtonType | 'Primary' | 'Secondary';
    onClick: (result: any) => void;
}

export interface FooterAction extends ButtonProps {
    validate?: boolean;
}

export interface WrappedFooterAction extends FooterAction {
    onClick: () => void;
}

export enum ButtonType {
    Primary = 'Primary',
    Secondary = 'Secondary'
}