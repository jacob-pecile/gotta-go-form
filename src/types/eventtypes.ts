interface ButtonProps{
    text: string;
    disabled?: boolean;
    type: ButtonType;
    onClick: (e: any) => void;
}

export interface FooterAction extends ButtonProps{
    validate?: boolean;
}

export enum ButtonType{
    Primary = "Primary",
    Secondary = "Secondary"
}