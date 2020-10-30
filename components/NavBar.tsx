import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
const { Header } = Layout;
import Image from 'next/image'

const TitleContainer = styled.div`
  ${({ theme }) => `
        background-color: ${theme['header-color']};
        width: 50%;
        display: flex;
        align-items: center;
        @media (max-width: 890px){
            visibility: hidden;
            width: 0;
        }
    `}
`;

const Title = styled.div`
  ${({ theme }) => `
            text-align: left;
            display: flex;
            line-height: 50px;
            div {
                width: 100%;
                padding-left: ${theme['padding-small']};
            }
            h2 {
                display: inline;
                color: inherit;
            }
            img {
                width: 64px;
            }
            p {
              line-height: 0;  
            }
        `}
`;

const StyledHeader = styled(Header)`
  ${({ theme }) => `
        background-color: ${theme['header-color']};
        border-bottom-color: ${theme['header-border-color']};
        border-bottom-right: 1px;
        border-bottom-style: solid;
        text-align: right;
        display: flex;
        li {
            font-size: ${theme['font-size-md']};
        }
    `}
`;

const StyledMenu = styled(Menu)`
  border-bottom-width: 0px;
  width: 50%;
  @media (max-width: 890px) {
    width: 100%;
  }
`;

export const MainNavbar = () => (
  <StyledHeader>
    <TitleContainer>
      <Title>
        <Image src="/DWlogo.jpg" alt="delishwish logo" width="100" height="100"/>
        <div>
          <h2>DelishWish</h2>
          <p>A recipe app that connects directly to your shopping list</p>
        </div>
      </Title>
    </TitleContainer>

    <StyledMenu theme="light" mode="horizontal" style={{ lineHeight: '64px' }}>
      <Menu.Item key="/">
        <Link href="/">
          <a>Home</a>
        </Link>
      </Menu.Item>
    </StyledMenu>
  </StyledHeader>
);