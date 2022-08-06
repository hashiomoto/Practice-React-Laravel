import React, { useState, useEffect }from 'react'; //1行目にuseStateを変更する
import { Button, Card } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MainTable from '../components/MainTable';
import axios from 'axios';//追記する
import PostFrom from '../components/PostFrom';//新しく作るフォームのコンポーネントの呼び出し
import { useNavigate } from "react-router-dom";

//スタイルの定義
const useStyles = makeStyles((theme) => createStyles({
    card: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
}));

//ヘッダーのコンテンツ用の配列定義
const headerList = ['名前', 'タスク内容', '編集', '完了'];



function Home() {
    //定義したスタイルを利用するための設定
    const classes = useStyles();

    //postsの状態を管理する
    const [posts, setPosts] = useState([]);

    const [formData, setFormData] = useState({name:'', content:''});

    // 画面遷移の準備
    const navigation = useNavigate();

    //画面に到着したらgetPostsDataを呼ぶ
    useEffect(() => {
        getPostsData();
    },[])

    //一覧情報を取得しステートpostsにセットする
    const getPostsData = () => {
        axios
            .get('/api/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

     //入力がされたら（都度）入力値を変更するためのfunction
    const inputChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        formData[key] = value;
        let data = Object.assign({}, formData);
        setFormData(data);
    }
    const createPost = async() => {
        //空だと弾く
        if(formData == ''){
            return;
        }
        //入力値を投げる
        await axios
            .post('/api/post/create', {
                name: formData.name,
                content: formData.content
            })
            .then((res) => {
                //戻り値をtodosにセット
                const tempPosts = posts
                tempPosts.push(res.data);
                setPosts(tempPosts)
                setFormData('');

                // 画面遷移
                navigation('/');
            })
            .catch(error => {
                console.log(error);
            });
    }

    const deletePost = async (post) => {
        await axios
            .post('/api/delete', {
            id: post.id
        })
        .then((res) => {
            this.setState({
                posts: res.posts
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

        //空配列として定義する
    let rows = [];
    //postsの要素ごとにrowsで使える形式に変換する
    posts.map((post) =>
        rows.push({
            name: post.name,
            content: post.content,
            editBtn: <Button color="secondary" variant="contained" key={post.id} href={`/post/edit/${post.id}`}>編集</Button>, //追加
            deleteBtn: <Button color="primary" variant="contained" href="/" onClick={() => deletePost(post)}>完了</Button>,//追記
        })
);
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <h1>タスク管理</h1>
                        <Card className={classes.card}>
                        <PostFrom data={formData} btnFunc={createPost} inputChange={inputChange} />
                        </Card>

                        <Card className={classes.card}>
                            {/* テーブル部分の定義 */}
                            <MainTable headerList={headerList} rows={rows} />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
