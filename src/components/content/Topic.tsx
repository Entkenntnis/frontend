import React from 'react'
import styled from 'styled-components'
import TopicLinkList from './TopicLinkList'
import { renderArticle } from '../../schema/articleRenderer'

export interface LinkInterface {
  title: string
  url: string
}

export interface LinksInterface {
  subfolders?: LinkInterface[]
  courses?: LinkInterface[]
  articles?: LinkInterface[]
  videos?: LinkInterface[]
  applets?: LinkInterface[]
  excercises?: LinkInterface[]
}

export enum TopicPurposes {
  overview,
  detail
}

interface TopicProp {
  title: string
  url?: string
  description: any
  purpose?: TopicPurposes
  links: LinksInterface
  children?: TopicProp[]
}

interface TopicProps {
  data: TopicProp
}

export default function Topic({ data }: TopicProps) {
  return (
    <>
      {data.purpose === TopicPurposes.detail ? (
        <Headline>{data.title}</Headline>
      ) : (
        <HeadlineLink href={data.url}>{data.title}</HeadlineLink>
      )}

      <Wrapper purpose={data.purpose}>
        <Overview>
          {data.description && renderArticle(data.description)}
        </Overview>
        {data.children &&
          data.children.map(child => (
            <>
              <Topic data={child} key={child.title} />
              <hr style={{ width: '100%' }} />
            </>
          ))}
        <LinkList>
          <TopicLinkList
            links={data.links || {}}
            purpose={data.purpose || TopicPurposes.overview}
          ></TopicLinkList>
        </LinkList>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div<{ purpose: TopicPurposes }>`
  display: flex;
  ${props =>
    props.purpose === TopicPurposes.overview
      ? `
            flex-direction: row;
        `
      : `
            flex-direction: column;
        `}
    
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

const Headline = styled.h1`
  font-size: 2.5rem;
  font-weight: 400;
`

const HeadlineLink = styled.a`
  color: ${props => props.theme.colors.brand};
  cursor: pointer;
  display: block;
  font-size: 1.6rem;
  margin-bottom: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const LinkList = styled.div`
  display: flex;
  flex: 1 1 55%;
  flex-direction: column;
  width: 100%;
`

const TopicImage = styled.img`
  margin: 0 auto 1rem;
  max-width: 90%;
`

const Description = styled.p`
  font-size: 1.2rem;
  margin: 0;
`

const Overview = styled.div`
  flex: 1 1 40%;
`
