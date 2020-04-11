import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlayCircle,
  faExpand,
  faCheckCircle
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

const lessons = [Lektion1, Lektion2, Lektion3, Lektion4]

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

export default function Reasoning() {
  const [active, setActive] = React.useState(undefined)
  const [lesson, setLesson] = React.useState(0)
  const [isLoaded, setLoaded] = React.useState(false)
  const [v, setV] = React.useState(0)
  const Lesson = lessons[lesson]

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
          <StyledH1>Flächeninhalt und Oberflächeninhalt</StyledH1>
          <StyledP>
            {lessons.map((_, i) => (
              <LessonButton
                key={i}
                onClick={() => {
                  setLesson(i)
                  setPage(i)
                }}
                active={i == lesson}
              >
                {i + 1}
              </LessonButton>
            ))}
          </StyledP>
          <SpecialCSS>
            <Lesson setActive={setActive} />
          </SpecialCSS>
          <HSpace amount={60} />
          <StyledP
            style={{
              cursor: 'pointer',
              textAlign: 'right'
            }}
            onClick={() => {
              launchIntoFullscreen(document.documentElement)
            }}
          >
            <FontAwesomeIcon size="1x" icon={faExpand} /> Vollbild
          </StyledP>
          <StyledP
            style={{
              cursor: 'pointer',
              textAlign: 'right'
            }}
            onClick={() => {
              if (window.confirm('Fortschritt löschen?')) {
                localStorage.removeItem(localStorageItemKey)
                storage.done = []
                storage.words = []
                setV(v + 1)
              }
            }}
          >
            Fortschritt löschen
          </StyledP>
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
        'Am_meisten_Fläche bedecken rote_Trapeze. Das_Muster enthält_insgesamt 56_Dreiecke, 32_Rauten und 24_Trapeze. Jedes_Trapez bedeckt so_viel_Fläche wie 3_Dreiecke. Die 24_Trapeze bedecken so_viel_Fläche wie 72_Dreiecke. Jede_Raute lässt_sich_in 2_Dreiecke zerlegen. Damit bedecken 32_Rauten so_viel_Fläche wie 64_Dreiecke. Das_ist weniger als die_Trapeze bedecken.',
        'Am_meisten_Fläche bedecken rote_Trapeze. Das_Muster ist_unterteilbar_in 8_Sechsecke. Jedes_Achteck enthält 3_Trapeze, 4_Rauten und 7_Dreiecke. Jedes_Trapez bedeckt so_viel_Fläche wie 3_Dreiecke. Die 3_Trapeze bedecken so_viel_Fläche wie 9_Dreiecke. Jede_Raute lässt_sich_in 2_Dreiecke zerlegen. Damit bedecken 4_Rauten so_viel_Fläche wie 8_Dreiecke. Das_ist weniger als die_Trapeze bedecken.'
      ],
      type: 'success'
    },
    {
      text: 'Am_meisten_Fläche bedecken rote_Trapeze. Das_sieht_man.',
      type: 'hint',
      message: 'Kannst du deine Aussage begründen?'
    },
    {
      text: 'Am_meisten_Fläche bedecken rote_Trapeze.',
      type: 'hint',
      message: 'Das ist korrekt. Begründe nun deine Antwort.'
    },
    {
      text: 'Am_meisten_Fläche bedecken grüne_Dreiecke.',
      type: 'hint',
      message: 'Kannst du diese Aussage begründen?'
    },
    {
      text:
        'Am_meisten_Fläche bedecken grüne_Dreiecke. Das_Muster enthält mehr_Dreiecke als Rauten oder Trapeze.',
      type: 'fail',
      message:
        'Die Anzahl der Figuren allein entscheidet nicht über die bedeckte Fläche. Prüfe nach: Bedecken zwei Dreiecke mehr Fläche als ein Trapez?'
    },
    {
      text: 'Am_meisten_Fläche bedecken blaue_Rauten.',
      type: 'fail',
      message: 'Das ist leider nicht korrekt.'
    },
    {
      text:
        'Am_meisten_Fläche bedecken rote_Trapeze. Das_Muster ist_unterteilbar_in 8_Achtecke.',
      type: 'fail',
      message: 'Das ist nicht korrekt. Zähle nochmal die Ecken nach.'
    },
    {
      text:
        'Am_meisten_Fläche bedecken rote_Trapeze. Das_Muster ist_unterteilbar_in 10_Sechsecke.',
      type: 'fail',
      message:
        'Das ist nicht korrekt. Zähle nochmal die Anzahl der Sechsecke nach.'
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

function Lektion1({ setActive }) {
  return (
    <>
      <StyledH2>Lektion 1: Parkette</StyledH2>
      <StyledP>
        Lasst uns Parkette anschauen und über Flächeninhalt nachdenken.
      </StyledP>
      <StyledH3>1.1) Was gehört nicht dazu?</StyledH3>
      <StyledP>
        <Button
          onClick={() => {
            setActive(l1_1)
          }}
        >
          <FontAwesomeIcon size="1x" icon={faPlayCircle} /> Start
        </Button>
        {storage.done['l1_1'] && (
          <>
            {' '}
            <FontAwesomeIcon
              size="1x"
              style={{ color: 'green' }}
              icon={faCheckCircle}
            />
          </>
        )}
      </StyledP>
      <StyledH3>1.2) Mehr Rot, Grün oder Blau?</StyledH3>
      <StyledP>
        <Button
          onClick={() => {
            setActive(l1_2)
          }}
        >
          <FontAwesomeIcon size="1x" icon={faPlayCircle} /> Start
        </Button>
        {storage.done['l1_2'] && (
          <>
            {' '}
            <FontAwesomeIcon
              size="1x"
              style={{ color: 'green' }}
              icon={faCheckCircle}
            />
          </>
        )}
      </StyledP>
      {renderArticle([
        {
          type: 'spoiler-container',
          children: [
            {
              type: 'spoiler-title',
              children: [{ text: 'Zum Weiterdenken' }]
            },
            {
              type: 'spoiler-body',
              children: [
                {
                  type: 'p',
                  children: [
                    {
                      text: 'Erstelle auf Karopapier ein Parkett,'
                    }
                  ]
                },
                {
                  type: 'ul',
                  children: [
                    {
                      type: 'li',
                      children: [
                        {
                          type: 'p',
                          children: [
                            {
                              text:
                                'das aus mindestens zwei unterschiedlichen Figuren besteht.'
                            }
                          ]
                        }
                      ]
                    },
                    {
                      type: 'li',
                      children: [
                        {
                          type: 'p',
                          children: [
                            {
                              text:
                                'bei dem jede Figurenart den gleichen Teil der Ebene bedeckt.'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ] as any)}
      <StyledH3>Zusammenfassung</StyledH3>
      <StyledP>
        In dieser Lektion lernten wir <em>Parkette</em> kennen. Ein Parkett
        bezeichnet eine Überdeckung einer zweidimensionalen Ebene mit Kopien der
        gleichen Figur oder Figuren, so dass es keine Lücken oder
        Überschneidungen gibt.
      </StyledP>
      <StyledP>
        Dann verglichen wir Parkette und die darin enthaltenen Figuren. Wenn wir
        darüber nachdenken, welche Muster und Formen mehr von der Ebene
        bedecken, haben wir begonnen, über den <b>Flächeninhalt</b>{' '}
        nachzudenken.
      </StyledP>
      <StyledP>
        Wir werden diese Arbeit fortsetzen und lernen, wie wir mathematische
        Werkzeuge strategisch einsetzen können, um uns bei der Mathematik zu
        unterstützen.
      </StyledP>
      <StyledH3>1.3) Was ist Flächeninhalt?</StyledH3>
      <StyledP>
        <Button
          onClick={() => {
            setActive(l1_1)
          }}
        >
          <FontAwesomeIcon size="1x" icon={faPlayCircle} /> Start
        </Button>
      </StyledP>
      <StyledH3>Übungsaufgaben</StyledH3>
      <StyledP>
        <Button
          onClick={() => {
            setActive(l1_1)
          }}
        >
          <FontAwesomeIcon size="1x" icon={faPlayCircle} /> Übung 1
        </Button>
      </StyledP>
      <StyledP>
        <Button
          onClick={() => {
            setActive(l1_1)
          }}
        >
          <FontAwesomeIcon size="1x" icon={faPlayCircle} /> Übung 2
        </Button>
      </StyledP>
      <StyledP>
        <Button
          onClick={() => {
            setActive(l1_1)
          }}
        >
          <FontAwesomeIcon size="1x" icon={faPlayCircle} /> Übung 3
        </Button>
      </StyledP>
      <StyledP>
        <Button
          onClick={() => {
            setActive(l1_1)
          }}
        >
          <FontAwesomeIcon size="1x" icon={faPlayCircle} /> Übung 4
        </Button>
      </StyledP>
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
