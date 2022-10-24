import styled from "@emotion/styled";

interface NameListProps {
    names: any[], 
    title: string
}

const Container = styled.div`
`;

const List = styled.ul`
    font-size: 1.2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 40px;
`

export const NameList = (props: NameListProps) => {
    return <Container>
        <h3>{props.title}</h3>
        <List>
            {props.names.map(name => <li key={name}>{name}</li>)}
        </List>
    </Container>;
  };
  