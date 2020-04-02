interface ButtonProps {
    text: string;
    disabled?: boolean;
    type: ButtonType | 'Primary' | 'Secondary';
    onClick: () => void;
}

export interface FooterAction extends ButtonProps {
    validate?: boolean;
}

export enum ButtonType {
    Primary = 'Primary',
    Secondary = 'Secondary'
}