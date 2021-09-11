import { useState, useEffect } from 'react'
import { RootState } from '../store/store'
import { useSelector } from 'react-redux'
import { setColorStyle } from '../libs'
import WordList from './WordList'

const Preview = () => {
	const [ words, setWords ] = useState<string[]>(['quis', 'pariatur', 'tempor'])
	const { color, tags } = useSelector((state: RootState) => state.settings) 

	useEffect(() => {
		if (!tags.length) {
			return
		}

		Array.from(document.querySelectorAll('.preview *'))
			.map((node) => node as HTMLElement)
			.forEach((node) => {
				node.style.color = ''
				node.style.backgroundColor = ''
			}
		)

		setColorStyle(words, [], tags.map(tag => '.preview ' + tag).join(','), color)
	}, [color, tags, words])

	return (
		<>
			<h2>Preview</h2>
			<WordList
				label="Words to preview"
				list={words}
				onAdd={(word) => setWords([...words, word])}
				onDelete={(word) => setWords(words.filter(w => w !== word))}
			/>
			<div className="preview">
				<div>
					Lorem ipsum dolor sit amet, <span>consectetur adipiscing elit, sed do eiusmod <u>tempor incididunt ut labore et dolore</u> magna aliqua.</span>
					<p>
						Ut enim ad minim veniam, <span><strong>quis nostrud</strong> exercitation ullamco laboris</span> nisi ut <a>aliquip ex ea commodo consequat</a>.
					</p>
				</div>
				<div>
					Duis aute irure dolor in reprehenderit
					<p>
						in voluptate velit esse <i>cillum dolore eu fugiat nulla pariatur</i>. Excepteur sint occaecat cupidatat non proident, <b>sunt in culpa qui</b> officia deserunt mollit anim id est laborum.
					</p>
				</div>
				<div>
					Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</b>
					<p>
						Ut enim ad minim veniam, <a><i>quis nostrud</i> exercitation ullamco laboris</a> nisi ut <span>aliquip ex ea commodo consequat</span>.
					</p>
				</div>
				<div>
					<u>Duis aute irure dolor</u> in reprehenderit
					<p>
						in voluptate velit esse <strong>cillum dolore <s>eu fugiat nulla pariatur</s></strong>. Excepteur sint occaecat cupidatat non proident, <em>sunt in culpa qui</em> officia deserunt mollit anim id est laborum.
					</p>
				</div>
				<h1>Lorem ipsum dolor sit amet</h1>
				<h2>consectetur adipiscing elit</h2>
				<h3>sed do eiusmod tempor incididunt</h3>
				<h4>ut labore et dolore magna aliqua</h4>
				<h5>Ut enim ad minim veniam</h5>
				<h6>quis nostrud exercitation ullamco</h6>
			</div>
		</>
	)
}

export default Preview