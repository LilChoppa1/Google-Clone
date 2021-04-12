import Head from 'next/head'
import { useRouter } from 'next/router';
import Header from '../components/Header'
import SearchResults from '../components/SearchResults';

function Search({results}) {
    console.log(results)
    
    const router = useRouter();
    
    return (
        <div>
            <Head>   
                <title>
                    {router.query.term }- Google Search
                </title>
                <link ref="icon" href="/favicon.ico" />
            </Head>

        {/* Header */}
        <Header />
        {/* SEARCH RESULT */}
            <SearchResults results={results} />
        </div>
    )
}

export default Search

export async function getServerSideProps(context) { 
    const API_KEY = process.env.API_KEY
    const CONTEXT_KEY = process.env.CONTEXT_KEY
    // const API = 'AIzaSyAeQA6lxoJMrFmCyNRJ_XNSCpMYyIFnO2k'
    // const CONTEXT = '9b742b4c4c0a5be02'
    const startIndex = context.query.start || "0";
    console.log(API_KEY)
    console.log(CONTEXT_KEY)
    console.log(context.query.term)
    console.log(startIndex)
    const data =  await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}`
        ).then((response) => response.json()
        
        );
        // AFTER THE SERVER HAS RENDER PASS THE RESULT TO CLIENT
        return{
            props:{
                results: data,
            },
        };
}