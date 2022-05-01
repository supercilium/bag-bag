import styled from "styled-components"
import { device } from "../../styles/constants"

export const BreadcrumbsRoot = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    margin: 0 -6px;

    &:before {
        content: '';
        display: block;
        min-width: 1px;
        height: 1px;
        background-color: ${({ theme }) => theme.colors.black};
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
    }

    @media ${device.laptop} {
        display: none;
    }
`

export const BreadcrumbsItem = styled.span<{ $active: boolean }>`
    letter-spacing: 0.03em;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: ${({ $active, theme }) => $active ? theme.colors.green : theme.colors.black};
    text-align: right;
    background-color: ${({ theme }) => theme.colors.white};
    z-index: 1;
    padding: 0 6px;
`