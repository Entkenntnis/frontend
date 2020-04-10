import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import ReasoningExercise, {
  calcGuessSuccessRate
} from '../src/components/content/ReasoningExercise'
import StyledH1 from '../src/components/tags/StyledH1'
import StyledH2 from '../src/components/tags/StyledH2'
import StyledP from '../src/components/tags/StyledP'
import HSpace from '../src/components/content/HSpace'
import StyledH3 from '../src/components/tags/StyledH3'
import { renderArticle } from '../src/schema/articleRenderer'

const l1_1 = {
  statement: [
    {
      type: 'p',
      children: [{ text: 'Welches Muster gehört nicht dazu?' }]
    },
    {
      type: 'img',
      src: '/openup/6.1.A1.Image.2-4.png',
      maxWidth: 400,
      children: [{ text: '' }]
    }
  ],
  answers: [
    {
      text: [
        'Muster A. Es enthält nur blau.',
        'Muster A. Es enthält kein gelb.',
        'Muster A. Gruppen aus vier Fünfecken bilden Sechsecke, die ohne Lücken zusammenpassen.',
        'Muster A. Gruppen aus vier Fünfecken bilden Sechsecke, die lückenlos zusammenpassen.',
        'Muster A. Gruppen aus vier Fünfecken bilden Sechsecke, die wie ein Parkett zusammenpassen.'
      ],
      type: 'success'
    },
    {
      text: [
        'Muster A. Es enthält nur gelb.',
        'Muster A. Es enthält kein blau.'
      ],
      type: 'fail',
      message: 'Muster A enthält auch blau.'
    },
    {
      text: ['Muster A. Es enthält nur eine Farbe.'],
      type: 'fail',
      message: 'Auch Muster B enthält nur eine Farbe.'
    },
    {
      text: [
        'Muster A. Es enthält nur Fünfecke.',
        'Muster A. Es enthält keine Vierecke.'
      ],
      type: 'fail',
      message: 'Das gilt auch für Muster B.'
    },
    {
      text: [
        'Muster A. Gruppen aus vier Sechsecken bilden Fünfecke, die ohne Lücke zusammenpassen.',
        'Muster A. Gruppen aus vier Fünfecken bilden Siebenecke, die ohne Lücke zusammenpassen.',
        'Muster A. Gruppen aus sechs Fünfecken bilden Sechsecke, die ohne Lücke zusammenpassen.'
      ],
      type: 'fail',
      message: 'Zähle nochmal die Ecken nach.'
    },
    {
      text: [
        'Muster A. Gruppen aus vier Fünfecken bilden Sechsecke, die nicht zusammenpassen.',
        'Muster A. Gruppen aus vier Fünfecken bilden Sechsecke, die nur mit Lücken zusammenpassen.'
      ],
      type: 'fail',
      message: 'Muster A enthält keine Lücken.'
    },
    {
      text: 'Muster B. Es enthält kein gelb.',
      type: 'fail',
      message: 'Muster B enthält gelb.'
    },
    {
      text: 'Muster B. Es enthält kein blau.',
      type: 'success'
    },
    {
      text: ['Muster A.', 'Muster B.', 'Muster C.', 'Muster D.'],
      type: 'hint',
      message: 'Erkläre, wie du auf deine Antwort gekommen bist.'
    }
  ]
}

console.log(
  'Guess success rate: ',
  Math.round(calcGuessSuccessRate(l1_1, []) * 1000) / 10 + '%'
)

export default function Reasoning() {
  const [active, setActive] = React.useState(undefined)

  return (
    <>
      {active && (
        <Overlay>
          <ReasoningExercise
            data={active}
            onExit={() => {
              setActive(undefined)
            }}
          />
        </Overlay>
      )}
      <Container>
        <MaxWidth>
          <HSpace amount={50} />
          <StyledH1>Flächeninhalt und Oberflächeninhalt</StyledH1>
          <StyledH2>Lektion 1: Parkettierung</StyledH2>
          <StyledP>
            Schauen wir uns Parkettierungen an und lasst uns über über
            Flächeninhalt nachdenken.
          </StyledP>
          <StyledH3>1.1) Parkettmuster</StyledH3>
          <StyledP>
            <Button
              onClick={() => {
                setActive(l1_1)
              }}
            >
              <FontAwesomeIcon size="1x" icon={faPlayCircle} /> Start
            </Button>
          </StyledP>
          <StyledH3>1.2) Mehr Rot, Grün oder Blau?</StyledH3>
          <StyledP>
            <Button
              onClick={() => {
                setActive(l1_1)
              }}
            >
              <FontAwesomeIcon size="1x" icon={faPlayCircle} /> Start
            </Button>
          </StyledP>
          {renderArticle([
            {
              type: 'spoiler-container',
              children: [
                {
                  type: 'spoiler-title',
                  children: [{ text: 'Weitergedacht' }]
                },
                {
                  type: 'spoiler-body',
                  children: [
                    {
                      type: 'p',
                      children: [{ text: 'Lalala' }]
                    }
                  ]
                }
              ]
            }
          ] as any)}
          <StyledH3>Zusammenfassung</StyledH3>
          <StyledP>
            In this lesson, we learned about tiling the plane, which means
            covering a two-dimensional region with copies of the same shape or
            shapes such that there are no gaps or overlaps.
          </StyledP>
          <StyledH3>Übungsaufgaben</StyledH3>
          <StyledP>
            <Button
              onClick={() => {
                setActive(l1_1)
              }}
            >
              <FontAwesomeIcon size="1x" icon={faPlayCircle} /> Übung 1
            </Button>{' '}
            <Button
              onClick={() => {
                setActive(l1_1)
              }}
            >
              <FontAwesomeIcon size="1x" icon={faPlayCircle} /> Übung 2
            </Button>{' '}
            <Button
              onClick={() => {
                setActive(l1_1)
              }}
            >
              <FontAwesomeIcon size="1x" icon={faPlayCircle} /> Übung 3
            </Button>{' '}
            <Button
              onClick={() => {
                setActive(l1_1)
              }}
            >
              <FontAwesomeIcon size="1x" icon={faPlayCircle} /> Übung 4
            </Button>
          </StyledP>
        </MaxWidth>
      </Container>
    </>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
`

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
`

const MaxWidth = styled.div`
  max-width: 700px;
`

const Button = styled.span`
  border-radius: 0.75rem;
  font-size: 1.125rem;
  border: 1px solid ${props => props.theme.colors.brand};
  cursor: pointer;
  padding: 6px 11px;
  user-select: none;
  color: ${props => props.theme.colors.brand};
  &:active,
  &:hover {
    background-color: ${props => props.theme.colors.brand};
    color: white;
  }
  transition: all 0.6s;
  display: inline-block;
  margin-bottom: 5px;
`
