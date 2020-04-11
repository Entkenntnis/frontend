import styled, { keyframes } from 'styled-components'
import { renderArticle } from '../../schema/articleRenderer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBackspace,
  faCheckCircle,
  faTimes,
  faTimesCircle,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons'
import Modal from '../Modal'
import React from 'react'
import { theme } from '../../theme'
import HSpace from './HSpace'

function getNextUp(data, words) {
  let entry = undefined
  let nextup = []

  function handleAnswer(text, answer) {
    const tokens = text.split(' ')
    if (words.every((word, i) => tokens[i] === word)) {
      // same prefix
      if (tokens.length === words.length) {
        entry = answer
      }
      if (
        tokens.length > words.length &&
        !nextup.includes(tokens[words.length])
      ) {
        nextup.push(tokens[words.length])
      }
    }
  }

  data.answers.forEach(answer => {
    if (Array.isArray(answer.text)) {
      answer.text.forEach(text => handleAnswer(text, answer))
    } else {
      handleAnswer(answer.text, answer)
    }
  })

  return { entry, nextup }
}

export function calcGuessSuccessRate(data, words) {
  const { entry, nextup } = getNextUp(data, words)
  if (entry) {
    if (entry.type === 'success') {
      return 1
    } else if (entry.type === 'fail') {
      return 0
    }
  }
  return nextup.reduce((acc, val) => {
    const newWords = words.slice(0)
    newWords.push(val)
    return acc + (1.0 / nextup.length) * calcGuessSuccessRate(data, newWords)
  }, 0)
}

export default function ReasoningExercise(props) {
  const { data, onExit } = props
  const [words, setWords] = React.useState(props.words || [])
  const [isDone, setDone] = React.useState(false)
  const [active, setActive] = React.useState(words.length > 0)
  const viewArea = React.useRef<HTMLDivElement>()

  React.useEffect(() => {
    console.log(
      'Guess success rate: ',
      Math.round(calcGuessSuccessRate(data, []) * 1000) / 10 + '%'
    )
  }, [data])

  const { entry, nextup } = getNextUp(data, words)
  const done = !!entry

  nextup.sort(function(a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })

  function getIcon() {
    if (entry) {
      if (entry.type === 'success') {
        return faCheckCircle
      }
      if (entry.type === 'fail') {
        return faTimesCircle
      }
      if (entry.type === 'hint') {
        return faExclamationCircle
      }
    }
  }

  function getColor() {
    if (entry) {
      if (entry.type === 'success') {
        return 'green'
      }
      if (entry.type === 'fail') {
        return 'red'
      }
      if (entry.type === 'hint') {
        return '#ffd500'
      }
    }
  }

  function getMessage() {
    if (entry) {
      if (entry.type === 'success') {
        return ''
      }
      if (entry.type === 'hint') {
        return <>{entry.message}</>
      }
      if (entry.message) {
        return entry.message
      }
    }
  }

  return (
    <PageContainer>
      <ViewArea ref={viewArea}>
        <ExitIcon
          onClick={() => {
            onExit('abort', words)
          }}
        >
          <FontAwesomeIcon size="1x" icon={faTimes} />
        </ExitIcon>
        <DisplayContainer>
          <TaskStatement>{renderArticle(data.statement)}</TaskStatement>
          <AnswerField
            invite={!active}
            onClick={() => {
              setActive(true)
              setTimeout(() => {
                const view = viewArea.current
                if (view) {
                  view.scrollTop = view.scrollHeight
                }
              })
            }}
          >
            {!active && <Word>Schreibe deine Antwort ...</Word>}
            {words.map((word, i) =>
              word
                .split('_')
                .map(w => <Word key={word + '-' + i + w}>{w}</Word>)
            )}
            {active && (!entry || !isDone || entry.type !== 'success') && (
              <Cursor />
            )}
            {active && words.length === 0 && <Word>&nbsp;</Word>}
          </AnswerField>
          {isDone && entry && entry.type === 'success' && (
            <>
              <ResultIcon color={getColor()}>
                <FontAwesomeIcon icon={getIcon()} size="1x" />
              </ResultIcon>
              <ContinueButton onClick={() => onExit('success')}>
                Weiter
              </ContinueButton>
              <HSpace amount={40} />
            </>
          )}
        </DisplayContainer>
      </ViewArea>
      {active && (!isDone || !entry || entry.type !== 'success') && (
        <InputArea>
          <WordsArea>
            {nextup.map(word => (
              <WordSelect
                key={word}
                onClick={() => {
                  const wordsNew = words.slice(0)
                  wordsNew.push(word)
                  setWords(wordsNew)
                  setTimeout(() => {
                    const view = viewArea.current
                    if (view) {
                      view.scrollTop = view.scrollHeight
                    }
                  })
                }}
              >
                {word.split('_').join(' ')}
              </WordSelect>
            ))}
          </WordsArea>
          <ActionsArea>
            <DoneAction
              available={done}
              onClick={() => {
                if (done) {
                  setDone(true)
                  setTimeout(() => {
                    const view = viewArea.current
                    if (view) {
                      view.scrollTop = view.scrollHeight
                    }
                  })
                }
              }}
            >
              Fertig
            </DoneAction>
            <BackAction
              onClick={() => {
                if (words.length > 0) {
                  const wordsNew = words.slice(0, -1)
                  setWords(wordsNew)
                  setTimeout(() => {
                    const view = viewArea.current
                    if (view) {
                      view.scrollTop = view.scrollHeight
                    }
                  })
                }
              }}
            >
              <FontAwesomeIcon icon={faBackspace} size="1x" />
            </BackAction>
          </ActionsArea>
        </InputArea>
      )}
      {entry && entry.type !== 'success' && (
        <StyledModal isOpen={isDone} onRequestClose={() => setDone(false)}>
          <Results>
            {entry && (entry.type === 'fail' || entry.type === 'hint') && (
              <ResultIcon color={getColor()}>
                <FontAwesomeIcon icon={getIcon()} size="1x" />
              </ResultIcon>
            )}
            <ResultMessage>{getMessage()}</ResultMessage>
            <ContinueButton
              onClick={() => {
                setDone(false)
              }}
            >
              Schließen
            </ContinueButton>
          </Results>
        </StyledModal>
      )}
    </PageContainer>
  )
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
`

const ExitIcon = styled.div`
  text-align: right;
  margin-right: 8px;
  cursor: pointer;
  font-size: 1.25rem;
  padding-right: 10px;
  padding-top: 10px;
  color: ${props => props.theme.colors.lightgray};
  &:hover,
  &:active {
    color: black;
  }
  transition: all 0.6s;
`

const ViewArea = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  min-height: 0;
  flex-basis: 0;
  overflow: auto;
`

const InputArea = styled.div`
  flex-basis: content;
  flex-shrink: 0;
  flex-grow: 0;
  width: 100%;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  border: 1px solid gray;
  box-sizing: border-box;
  user-select: none;
`

const WordsArea = styled.div`
  min-width: 0;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  background-color: ${props => props.theme.colors.bluewhite};
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  align-content: flex-start;
  max-height: 140px;
  min-height: 140px;
  overflow: auto;
  justify-content: space-around;
  @media (min-width: 600px) {
    justify-content: center;
  }
  padding-top: 16px;
`

const ActionsArea = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  border-left: 1px solid black;
  padding: 15px;
`

const DoneAction = styled.div<{ available: boolean }>`
  border: 1px solid
    ${props =>
      props.available
        ? props.theme.colors.brandGreen
        : props.theme.colors.lightgray};
  color: ${props => (props.available ? props.theme.colors.brandGreen : 'gray')};
  font-size: 1.125rem;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  cursor: ${props => (props.available ? 'pointer' : 'inherit')};
  ${props =>
    props.available
      ? `
    cursor: pointer;
    &:hover,
    &:active {
      background-color: ${props.theme.colors.brandGreen};
      color: white;
    }
  `
      : ''}
  transition: color 0.2s;
  transition: background-color 0.2s;
`

const BackAction = styled.div`
  font-size: 1.4rem;
  border-radius: 0.25rem;
  padding: 0.75rem;
  cursor: pointer;
  user-select: none;
  text-align: center;
  margin-top: 15px;
  color: ${props => props.theme.colors.darkgray};
  &:hover,
  &:active {
    color: black;
  }
  transition: all 0.6s;
`
const fadein = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const DisplayContainer = styled.div`
  margin: 20px auto 0 auto;
  max-width: 550px;
  overflow: hidden;
  @media (max-width: 600px) {
    margin-top: 0;
  }

  animation: ${fadein} 1s;
`

const TaskStatement = styled.div``

const AnswerField = styled.div<{ invite?: boolean }>`
  background: ${props => props.theme.colors.lightBlueBackground};
  margin-top: 20px;
  border: 1px solid ${props => props.theme.colors.brand};
  padding: 10px;
  padding-bottom: 0;
  display: flex;
  flex-wrap: wrap;
  user-select: none;
  box-sizing: border-box;
  ${props =>
    props.invite
      ? 'cursor: pointer;color:' +
        props.theme.colors.gray +
        ';margin-left:10px;margin-right: 10px;margin-bottom: 10px;'
      : ''}
`

const Word = styled.span`
  border-radius: 0.25rem;
  /*background-color: rgba(199, 234, 255, 1);*/
  padding: 0.2rem;
  font-size: 1.125rem;
  margin-bottom: 10px;
`

const WordSelect = styled.span`
  border-radius: 0.25rem;
  background: ${props => props.theme.colors.lightBlueBackground};
  padding: 0.5rem;
  margin-right: 20px;
  font-size: 1.125rem;
  margin-bottom: 10px;
  cursor: pointer;
  @media (min-width: 600px) {
    padding: 0.7rem;
  }
  &:hover,
  &:active {
    background: ${props => props.theme.colors.lighterblue};
  }
  transition: all 0.2s;
`

const blinking = keyframes`
  0%{background-color: transparent;}
  50%{background-color: transparent;}
  100%{background-color: ${theme.colors.brand}}
`

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1.1rem;
  padding-bottom: 0.7rem;
  animation: ${blinking} 1500ms steps(1, start) infinite;
`

const Results = styled.div`
  max-width: 550px;
  margin-left: auto;
  margin-right: auto;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: nowrap;
  user-select: none;
`

const ResultIcon = styled.div<{ color: string }>`
  text-align: center;
  font-size: 2rem;
  padding: 25px;
  color: ${props => props.color};
`

const ResultMessage = styled.p`
  padding: 10px 0;
  text-align: left;
  font-size: 1.125rem;
  margin-top: 0;
  margin-bottom: 24px;
  width: 100%;
`

const ContinueButton = styled.div`
  border: 1px solid ${props => props.theme.colors.brand};
  color: ${props => props.theme.colors.brand};
  &:active,
  &:hover {
    background-color: ${props => props.theme.colors.brand};
    color: white;
  }
  font-size: 1.125rem;
  padding: 0.4rem;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: all 0.25s;
  margin-left: auto;
  margin-right: auto;
  max-width: 100px;
  text-align: center;
`

const StyledModal = styled(Modal)`
  position: absolute;
  top: 40px;
  left: 40px;
  right: 40px;
  bottom: 40px;
  border: 1px solid ${props => props.theme.colors.lightgray};
  background: white;
  overflow: auto;
  border-radius: 4px;
  outline: none;
  padding: 20px;
  @media (max-width: 550px) {
    top: 16px;
    left: 16px;
    right: 16px;
    bottom: 16px;
    padding: 8px;
  }

  animation: ${fadein} 0.3s;
`
