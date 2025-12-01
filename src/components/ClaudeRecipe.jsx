import ReactMarkdown from 'react-markdown'
export default function ClaudeRecipe({valueRef,result}) {
    return (
        <section className='ai-output' ref={valueRef}>
           <ReactMarkdown>
            {result}
           </ReactMarkdown>
        </section>
    )
}