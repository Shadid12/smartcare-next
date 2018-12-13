import React from 'react';
import styled from 'styled-components';

import {
    FaFlag,
    FaRegBell,
    FaRegEdit
} from 'react-icons/fa'


const Container = styled.div`
    margin: 8px;
    border: 1px solid pink;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    min-width: 400px;
`;

const Title = styled.h3`
    padding: 8px;
`;

const FeedbackContent = styled.p`
    padding: 8px;
    border-radius: 2px;
    margin: 5px;
    background-color: gainsboro;
`

const BoxIcon = styled.span`
    margin-right: 5px;
`

export default class FeedbackCol extends React.Component {
    render() {
        return(
            <Container>
                <Title>Feedbacks</Title>
                <FeedbackContent>
                    <BoxIcon>
                        <FaFlag />
                    </BoxIcon>
                    <h3>Lab Results</h3>
                    <li>
                        This is a cool annoument for a lab result
                    </li>
                    <li>
                        This is a cool annoument for a lab result
                    </li>
                    <li>
                        This is a cool annoument for a lab result
                    </li>
                </FeedbackContent>
                <FeedbackContent>
                    <BoxIcon>
                        <FaRegEdit />
                    </BoxIcon>
                    <h3>Falls</h3>
                    Announcement Falls
                </FeedbackContent>
                <FeedbackContent>
                    <BoxIcon>
                        <FaRegBell />
                    </BoxIcon>
                    <h3>Changes</h3>
                    Announcement for recent changes
                </FeedbackContent>
            </Container>
        )
    }
}