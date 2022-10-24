import styled from "@emotion/styled";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode | undefined
    to?: string;
}
const Container = styled.div`
    display: flex;
    color: white;
    background-color: red;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transform: scale(1);
    transition: transform .5s ease-in-out;

    &:hover {
        transform: scale(1.5);
    }

    button, a {
        display: flex;
        width: 100%;
        height: 100%;
        padding: 15px;
        background: transparent;
        border: 0;
        color: #fff;
        cursor: pointer;
        text-decoration: none;
    }
`;

export const Button = (props: ButtonProps) => {
    if(props.to) {
        return <Container>
            <Link to={props.to}>
                {props.children}
            </Link>
        </Container>;
    } else {
        return <Container>
            <button {...props}>
                {props.children}
            </button>
        </Container>;
    }
};