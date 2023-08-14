import ArticleList from "../components/ArticleList"
import articles from "./articleContent"
const ArticleListPage = () => {
    return (
        <>
        <h1>Articles</h1>
        {
            <ArticleList articles={articles}/>
        }
        </>
    )
}

export default ArticleListPage