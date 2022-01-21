import axios from 'axios';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdSense from 'react-adsense';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { Container, Row, Col, Button, Table, Form, Card } from 'react-bootstrap';

const API_URL = 'https://fushinsha.auri.ga/api/genText';

export default class App extends Component {
  // 初期値を設定
  constructor(props) {
    super(props);
    this.state = {
      api_data: [],
      twitter_link: []
    };
  }

  /**
   * APIを実行する
   */
  handleTestCallApi() {
    axios
      .get(API_URL)
      .then((results) => {
        const data = results.data; // APIレスポンスを取得する
        this.setState({
          api_data: data,
          mastoshare_link: "https://mastoshare.net/post.php?text=" + data.message + " \n%23不審者ジェネレーター https://auri.ga/fushinsha&ref=no"
        });
      },
      )
      .catch((error) => {
        if (error.response) {
          // 200系以外の時にエラーが発生する
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          // 上記以外のエラーが発生した場合
          console.log('Error', error.message);
        }
      });
  }

  render() {
    return (
      <div className="app">
        <Container>
          <div className="mt-2">
            <h1>不審者情報ジェネレーター</h1>
          </div>
          <div className="mb2">
            <a href="http://fushinsha-joho.co.jp/">日本不審者情報センター</a>から得た不審者情報を元に、架空の不審者情報を生成します。
          </div>

          <br />
          <Card className="text-center">
            <Card.Header>不審者ジェネレーター</Card.Header>
            <Card.Body>
              <Card.Title>生成結果</Card.Title>
              <Card.Text style={{ whiteSpace: 'pre-line' }}>
                {this.state.api_data['message']}
              </Card.Text>
              <div className="mb-2">
                <Button variant="success" onClick={() => this.handleTestCallApi()}>不審者を生成する</Button>
              </div>
              <TwitterShareButton url={["https://auri.ga/fushinsha/"]} hashtags={["不審者ジェネレーター"]} title={[this.state.api_data['message']]}>
                <Button variant="info">Twitterにシェア</Button>
              </TwitterShareButton>{' '}
              <a href={this.state.mastoshare_link}><Button>Mastodonにシェア</Button></a>{' '}
            </Card.Body>
          </Card>
          <AdSense.Google
            client='ca-pub-3761835579827953'
            slot='1039188699'
          />
          <div className="mt-3">
            <div class="mastodon_design">
            <div class="ns-container">
            <ins data-title="20分間隔で投稿するBot" data-acct="mecha_fushinsha_bot@ap.ketsuben.red" data-limit="30" data-nocss="1"></ins>
            </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
