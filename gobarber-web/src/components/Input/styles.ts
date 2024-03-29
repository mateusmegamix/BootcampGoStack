import styled, {css} from 'styled-components'
import Tooltip from '../Tooltip'

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    background: #232129;
    border-radius: 10px;
    border: 2px solid #232129;
    padding: 16px;
    width: 100%;
    color: #666360;

    display: flex;
    align-items: center;

    & + div {
        margin-top: 8px;
    }

    ${(props) => 
        props.isErrored &&
        css`
            border-color: #C53030;
    `}

    ${props => 
        props.isFocused && 
        css`
            color: #FF9000;
            border-color: #FF9000;
    `}

    ${(props) => 
        props.isFilled &&
        css`
            color: #FF9000;
    `}

    input {
        flex: 1;
        background: transparent;
        border: 0;
        color: #F4EDE8;

        &::placeholder {
            color: #666360;
        }

    }

    svg {
        margin-right: 16px;
    }
`;

export const Error = styled(Tooltip)`
    height: 20px;
    svg {
        margin: 0;
    }

    span {
        background: #C53030;
        color: #FFFFFF;

        &::before {
            border-color: #C53030 transparent;
        }
    }
`