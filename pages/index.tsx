import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlayCircle,
  faExpand,
  faCheckCircle,
  faSpinner,
  faUndo
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import ReasoningExercise from '../src/components/content/ReasoningExercise'
import StyledH1 from '../src/components/tags/StyledH1'
import StyledH2 from '../src/components/tags/StyledH2'
import StyledP from '../src/components/tags/StyledP'
import HSpace from '../src/components/content/HSpace'
import StyledH3 from '../src/components/tags/StyledH3'
import { renderArticle } from '../src/schema/articleRenderer'
import StyledA from '../src/components/tags/StyledA'
import SpecialCSS from '../src/components/content/SpecialCSS'
import { theme } from '../src/theme'

let storage = {
  done: {},
  words: {},
  page: 0
}

const localStorageItemKey = 'area_data'

function setDone(key) {
  storage.done[key] = true
  localStorage.setItem(localStorageItemKey, JSON.stringify(storage))
}

function setWords(key, words) {
  storage.words[key] = words
  localStorage.setItem(localStorageItemKey, JSON.stringify(storage))
}

function setPage(index) {
  storage.page = index
  localStorage.setItem(localStorageItemKey, JSON.stringify(storage))
}

const LessonContext = React.createContext<any>({})

export default function Reasoning() {
  const [active, setActive] = React.useState(undefined)
  const [lesson, setLesson] = React.useState(0)
  const [isLoaded, setLoaded] = React.useState(false)
  const [v, setV] = React.useState(0)

  React.useEffect(() => {
    const data = window.localStorage.getItem(localStorageItemKey)
    if (data) {
      storage = JSON.parse(data)
      setLesson(storage.page || 0)
    }
    setLoaded(true)
  }, [])

  if (!isLoaded) return null

  return (
    <>
      <Container>
        <MaxWidth>
          <StyledH1>Lektion 1: Parkette</StyledH1>

          <SpecialCSS>
            <LessonContext.Provider value={{ setActive }}>
              <Lektion1 setActive={setActive} />
            </LessonContext.Provider>
          </SpecialCSS>
          <HSpace amount={60} />
          <StyledP
            style={{
              textAlign: 'right'
            }}
          ></StyledP>
          <p style={{ margin: '16px' }}>
            <small>
              Lade die Originalversion kostenlos herunter:{' '}
              <StyledA href="https://openupresources.org/">
                openupresources.org
              </StyledA>
            </small>
          </p>
        </MaxWidth>
      </Container>
      {active && (
        <Overlay>
          <ReasoningExercise
            data={active}
            words={storage.words[active.id]}
            onExit={(state, payload) => {
              if (state === 'success') {
                setDone(active.id)
              } else if (state === 'abort') {
                setWords(active.id, payload)
              }
              setActive(undefined)
            }}
          />
        </Overlay>
      )}
    </>
  )
}

function launchIntoFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
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
  overflow-y: scroll;
  position: relative;
`

const MaxWidth = styled.div`
  max-width: 700px;
  width: 100%;
  padding-top: 50px;
  @media (max-width: 550px) {
    padding-top: 20px;
  }
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

const LessonButton = styled(Button)<{ active: boolean }>`
  margin-right: 10px;
  min-width: 20px;
  text-align: center;
  ${props =>
    props.active
      ? `background-color: ${props.theme.colors.brand};color: white;`
      : ''}
`

function Task({ data, text = 'Start' }) {
  const { setActive } = React.useContext(LessonContext)
  return (
    <StyledP>
      <Button onClick={() => setActive(data)}>
        <FontAwesomeIcon size="1x" icon={faPlayCircle} /> {text}
      </Button>
      {storage.done[data.id] && (
        <>
          {' '}
          <FontAwesomeIcon
            size="1x"
            style={{ color: 'green' }}
            icon={faCheckCircle}
          />
        </>
      )}
      {storage.words[data.id] && storage.words[data.id].length > 0 && (
        <>
          {' '}
          <FontAwesomeIcon
            size="1x"
            style={{ color: '#ffd500' }}
            icon={faSpinner}
          />
        </>
      )}
    </StyledP>
  )
}

// Lektion 1 --------------------------------------------------------------------------------------

const l1_1 = {
  id: 'l1_1',
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
        'Muster B. Es enthält nur gelb.',
        'Muster B. Es enthält kein blau.',
        'Muster C. Es enthält keine Fünfecke.',
        'Muster C. Es enthält Achtecke.',
        'Muster C. Die Figuren sind unterschiedlich groß.',
        'Muster D. Es besitzt Lücken zwischen den Figuren.',
        'Muster D. Es enthält weiße Flächen.',
        'Muster D. Alle Figuren haben die gleiche Seitenlänge.'
      ],
      type: 'success'
    },
    {
      text: ['Muster A.', 'Muster B.', 'Muster C.', 'Muster D.'],
      type: 'hint',
      message: 'Erkläre, wie du auf deine Antwort gekommen bist.'
    },
    {
      text: ['Muster A. Es enthält kein blau.'],
      type: 'fail',
      message: 'Muster A enthält blau.'
    },
    {
      text: ['Muster A. Es enthält nur gelb.'],
      type: 'fail',
      message: 'Muster A enthält kein gelb.'
    },
    {
      text: [
        'Muster A. Es enthält nur eine Farbe.',
        'Muster A. Es enthält nur Fünfecke.',
        'Muster A. Es enthält keine Vierecke.'
      ],
      type: 'fail',
      message: 'Das gilt auch für Muster B.'
    },
    {
      text: 'Muster B. Es enthält kein gelb.',
      type: 'fail',
      message: 'Muster B enthält gelb.'
    },
    {
      text: 'Muster B. Es enthält nur blau.',
      type: 'fail',
      message: 'Muster B enthält kein blau.'
    },
    {
      text: 'Muster B. Es enthält kein gelb.',
      type: 'fail',
      message: 'Muster B enthält gelb.'
    },
    {
      text: [
        'Muster B. Es enthält nur eine Farbe.',
        'Muster B. Es enthält nur Fünfecke.',
        'Muster B. Es enthält keine Vierecke.'
      ],
      type: 'fail',
      message: 'Das gilt auch für Muster A.'
    },
    {
      text: 'Muster C. Es enthält keine Sechsecke.',
      type: 'fail',
      message: 'Kein Muster enthält Sechsecke.'
    },
    {
      text: 'Muster C. Es enthält Fünfecke.',
      type: 'fail',
      message: 'Muster C enthält keine Fünfecke.'
    },
    {
      text: 'Muster C. Die Figuren sind ähnlich groß.',
      type: 'fail',
      message: 'Das Viereck ist viel kleiner als das Achteck.'
    },
    {
      text: 'Muster D. Es enthält keine Lücken zwischen den Figuren.',
      type: 'fail',
      message:
        'Drei Seiten des Vierecks in Muster D berühren keine andere Figur.'
    },
    {
      text: [
        'Muster D. Es enthält blaue Flächen.',
        'Muster D. Es enthält gelbe Flächen.'
      ],
      type: 'fail',
      message: 'Das gilt auch für andere Muster'
    },
    {
      text: 'Muster D. Alle Figuren haben die gleiche Größe.',
      type: 'fail',
      message: 'Die Fünfecke sind größer als die Vierecke.'
    }
  ]
}

const l1_2 = {
  id: 'l1_2',
  statement: [
    {
      type: 'p',
      children: [
        {
          text:
            'Schaue dir das Muster an. Welche Figur bedeckt am meisten Fläche: blaue Rauten, rote Trapeze oder grüne Dreiecke? Begründe deine Antwort.'
        }
      ]
    },
    {
      type: 'img',
      src: '/openup/6.1.A1.Image.5.1b.png',
      maxWidth: 400,
      children: [{ text: '' }]
    },
    {
      type: 'spoiler-container',
      children: [
        {
          type: 'spoiler-title',
          children: [{ text: 'Hinweis' }]
        },
        {
          type: 'spoiler-body',
          children: [
            {
              type: 'img',
              src: '/openup/6.1.A1.Image.5.1b_hint.png',
              maxWidth: 400,
              children: [{ text: '' }]
            }
          ]
        }
      ]
    }
  ],
  answers: [
    {
      text: [
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ein rotes Trapez bedeckt 3_Dreiecke. Es gibt 24_Trapeze. Diese bedecken insgesamt 72 Dreiecke. Eine blaue Raute bedeckt 2_Dreiecke. Es gibt 32_Rauten. Diese bedecken insgesamt 64 Dreiecke. Es gibt 56 Dreiecke. Am meisten Fläche wird also von Trapezen bedeckt.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ich schaue mir nur das Sechseck an, weil es sich im Muster wiederholt. Ein rotes Trapez bedeckt 3_Dreiecke. Das Sechseck enthält 3_Trapeze. Diese bedecken insgesamt 9 Dreiecke. Eine blaue Raute bedeckt 2_Dreiecke. Das Sechseck enthält 4_Rauten. Diese bedecken insgesamt 8 Dreiecke. Das Sechseck enthält 7_Dreiecke. Am meisten Fläche wird also von Trapezen bedeckt.'
      ],
      type: 'success'
    },
    {
      text:
        'Meine Strategie: Ich zähle die Anzahl der Figuren. Die Figur, die am meisten vorkommt, bedeckt die meiste Fläche.',
      type: 'fail',
      message:
        'Die Anzahl der Figuren allein entscheidet nicht über die bedeckte Fläche. Prüfe nach: Bedecken zwei Dreiecke mehr Fläche als ein Trapez?'
    },
    {
      text: [
        'Am meisten Fläche bedecken rote Trapeze.',
        'Am meisten Fläche bedecken blaue Rauten.',
        'Am meisten Fläche bedecken grüne Dreiecke.'
      ],
      type: 'hint',
      message: 'Kannst du deine Antwort begründen?'
    },
    {
      text: [
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ein rotes Trapez bedeckt 2_Dreiecke,',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ein rotes Trapez bedeckt 4_Dreiecke,',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ein rotes Trapez bedeckt 3_Dreiecke. Es gibt 20_Trapeze.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ein rotes Trapez bedeckt 3_Dreiecke. Es gibt 22_Trapeze.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ein rotes Trapez bedeckt 3_Dreiecke. Es gibt 24_Trapeze. Diese bedecken insgesamt 72 Dreiecke. Eine blaue Raute bedeckt 3_Dreiecke.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ein rotes Trapez bedeckt 3_Dreiecke. Es gibt 24_Trapeze. Diese bedecken insgesamt 72 Dreiecke. Eine blaue Raute bedeckt 4_Dreiecke.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ein rotes Trapez bedeckt 3_Dreiecke. Es gibt 24_Trapeze. Diese bedecken insgesamt 72 Dreiecke. Eine blaue Raute bedeckt 2_Dreiecke. Es gibt 34_Rauten.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ein rotes Trapez bedeckt 3_Dreiecke. Es gibt 24_Trapeze. Diese bedecken insgesamt 72 Dreiecke. Eine blaue Raute bedeckt 2_Dreiecke. Es gibt 36_Rauten.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ein rotes Trapez bedeckt 3_Dreiecke. Es gibt 24_Trapeze. Diese bedecken insgesamt 72 Dreiecke. Eine blaue Raute bedeckt 2_Dreiecke. Es gibt 32_Rauten. Diese bedecken insgesamt 64 Dreiecke. Es gibt 50_Dreiecke.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ein rotes Trapez bedeckt 3_Dreiecke. Es gibt 24_Trapeze. Diese bedecken insgesamt 72 Dreiecke. Eine blaue Raute bedeckt 2_Dreiecke. Es gibt 32_Rauten. Diese bedecken insgesamt 64 Dreiecke. Es gibt 62_Dreiecke.'
      ],
      type: 'fail',
      message: 'Zähle nochmal nach.'
    },
    {
      text: [
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ein rotes Trapez bedeckt 3_Dreiecke. Es gibt 24_Trapeze. Diese bedecken insgesamt 72 Dreiecke. Eine blaue Raute bedeckt 2_Dreiecke. Es gibt 32_Rauten. Diese bedecken insgesamt 64 Dreiecke. Es gibt 56 Dreiecke. Am meisten Fläche wird also von Rauten bedeckt.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ein rotes Trapez bedeckt 3_Dreiecke. Es gibt 24_Trapeze. Diese bedecken insgesamt 72 Dreiecke. Eine blaue Raute bedeckt 2_Dreiecke. Es gibt 32_Rauten. Diese bedecken insgesamt 64 Dreiecke. Es gibt 56 Dreiecke. Am meisten Fläche wird also von Dreiecken bedeckt.'
      ],
      type: 'fail',
      message: 'Schaue dir nochmal die bisherigen Ergebnisse an.'
    },
    {
      text: [
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ich schaue mir nur das Sechseck an, weil es sich im Muster wiederholt. Ein rotes Trapez bedeckt 2_Dreiecke.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ich schaue mir nur das Sechseck an, weil es sich im Muster wiederholt. Ein rotes Trapez bedeckt 4_Dreiecke.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ich schaue mir nur das Sechseck an, weil es sich im Muster wiederholt. Ein rotes Trapez bedeckt 3_Dreiecke. Das Sechseck enthält 4_Trapeze.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ich schaue mir nur das Sechseck an, weil es sich im Muster wiederholt. Ein rotes Trapez bedeckt 3_Dreiecke. Das Sechseck enthält 7_Trapeze.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ich schaue mir nur das Sechseck an, weil es sich im Muster wiederholt. Ein rotes Trapez bedeckt 3_Dreiecke. Das Sechseck enthält 3_Trapeze. Diese bedecken insgesamt 9 Dreiecke. Eine blaue Raute bedeckt 3_Dreiecke.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ich schaue mir nur das Sechseck an, weil es sich im Muster wiederholt. Ein rotes Trapez bedeckt 3_Dreiecke. Das Sechseck enthält 3_Trapeze. Diese bedecken insgesamt 9 Dreiecke. Eine blaue Raute bedeckt 4_Dreiecke.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ich schaue mir nur das Sechseck an, weil es sich im Muster wiederholt. Ein rotes Trapez bedeckt 3_Dreiecke. Das Sechseck enthält 3_Trapeze. Diese bedecken insgesamt 9 Dreiecke. Eine blaue Raute bedeckt 2_Dreiecke. Das Sechseck enthält 3_Rauten.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ich schaue mir nur das Sechseck an, weil es sich im Muster wiederholt. Ein rotes Trapez bedeckt 3_Dreiecke. Das Sechseck enthält 3_Trapeze. Diese bedecken insgesamt 9 Dreiecke. Eine blaue Raute bedeckt 2_Dreiecke. Das Sechseck enthält 7_Rauten.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ich schaue mir nur das Sechseck an, weil es sich im Muster wiederholt. Ein rotes Trapez bedeckt 3_Dreiecke. Das Sechseck enthält 3_Trapeze. Diese bedecken insgesamt 9 Dreiecke. Eine blaue Raute bedeckt 2_Dreiecke. Das Sechseck enthält 4_Rauten. Diese bedecken insgesamt 8 Dreiecke. Das Sechseck enthält 9_Dreiecke.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ich schaue mir nur das Sechseck an, weil es sich im Muster wiederholt. Ein rotes Trapez bedeckt 3_Dreiecke. Das Sechseck enthält 3_Trapeze. Diese bedecken insgesamt 9 Dreiecke. Eine blaue Raute bedeckt 2_Dreiecke. Das Sechseck enthält 4_Rauten. Diese bedecken insgesamt 8 Dreiecke. Das Sechseck enthält 8_Dreiecke.'
      ],
      type: 'fail',
      message: 'Zähle nochmal nach.'
    },
    {
      text: [
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ich schaue mir nur das Sechseck an, weil es sich im Muster wiederholt. Ein rotes Trapez bedeckt 3_Dreiecke. Das Sechseck enthält 3_Trapeze. Diese bedecken insgesamt 9 Dreiecke. Eine blaue Raute bedeckt 2_Dreiecke. Das Sechseck enthält 4_Rauten. Diese bedecken insgesamt 8 Dreiecke. Das Sechseck enthält 7_Dreiecke. Am meisten Fläche wird also von Rauten bedeckt.',
        'Meine Strategie: Ich unterteile jede Figur in kleine Dreiecke und zähle die Dreiecke. Ich schaue mir nur das Sechseck an, weil es sich im Muster wiederholt. Ein rotes Trapez bedeckt 3_Dreiecke. Das Sechseck enthält 3_Trapeze. Diese bedecken insgesamt 9 Dreiecke. Eine blaue Raute bedeckt 2_Dreiecke. Das Sechseck enthält 4_Rauten. Diese bedecken insgesamt 8 Dreiecke. Das Sechseck enthält 7_Dreiecke. Am meisten Fläche wird also von Dreiecken bedeckt.'
      ],
      type: 'fail',
      message: 'Schaue dir nochmal die bisherigen Ergebnisse an.'
    }
  ]
}

/*

,
      {
        text: '',
        type: 'fail',
        message: ''
      }

    */

const l1_3 = {
  id: 'l1_3',
  statement: [
    {
      type: 'p',
      children: [
        {
          text:
            'Denke kurz nach und schreibe deine beste Definition für den Flächeninhalt.'
        }
      ]
    }
  ],
  answers: [
    {
      text: [
        'Der Flächeninhalt ist der Raum innerhalb einer zweidimensionalen Figur.',
        'Der Flächeninhalt ist der Raum innerhalb einer Figur.',
        'Der Flächeninhalt ist die Anzahl an Einheitsquadraten innerhalb einer Figur.',
        'Der Flächeninhalt ist die Anzahl an Qudraten innerhalb einer Figur.',
        'Der Flächeninhalt ist die Breite mal die Höhe.',
        'Der Flächeninhalt zeigt, wie groß eine Figur ist.',
        'Der Flächeninhalt zeigt, wie viel Platz innerhalb einer Figur ist.',
        'Der Flächeninhalt gibt an, wie viele Quadrate der gleichen Größe in diese Figur passen.',
        'Der Flächeninhalt gibt an, wie viele Einheitsquadrate in diese Figur passen.'
      ],
      type: 'success'
    }
  ]
}

function Lektion1({ setActive }) {
  return (
    <>
      <StyledP>
        Lasst uns Parkette anschauen und über Flächeninhalt nachdenken.
      </StyledP>
      <StyledH2>1.1) Was gehört nicht dazu?</StyledH2>
      <Task data={l1_1} />
      {storage.done[l1_1.id] && (
        <StyledP>
          Bonusauftrag: Finde für jedes Muster einen Grund, warum es nicht
          dazugehört.
        </StyledP>
      )}
      <StyledH2>1.2) Mehr Rot, Grün oder Blau?</StyledH2>
      <Task data={l1_2} />
      <StyledH2>1.3) Was ist Flächeninhalt?</StyledH2>
      <Task data={l1_3} />
      {storage.done[l1_1.id] && storage.done[l1_2.id] && storage.done[l1_3.id] && (
        <>
          <HSpace amount={50} />
          <StyledP style={{ color: theme.colors.orange }}>
            <strong>Vielen Dank, dass du die Demo ausprobiert hast!</strong>
          </StyledP>
        </>
      )}
    </>
  )
}

// Lektion 2 --------------------------------------------------------------------------------------

function Lektion2() {
  return (
    <>
      <StyledH2>Lektion 2: ...</StyledH2>
    </>
  )
}

// Lektion 3 --------------------------------------------------------------------------------------

function Lektion3() {
  return (
    <>
      <StyledH2>Lektion 3: ...</StyledH2>
    </>
  )
}

// Lektion 4 --------------------------------------------------------------------------------------

function Lektion4() {
  return (
    <>
      <StyledH2>Lektion 4: ...</StyledH2>
    </>
  )
}
