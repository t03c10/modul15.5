App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function (searchingText) {  // 1.
        this.setState({
            loading: true  // 2.
        });
        this.getGif(searchingText).then(gif => {  // 3.
            this.setState({  // 4
                loading: false,  // a
                gif: gif,  // b
                searchingText: searchingText  // c
            });
        });
    },

    getGif: function (searchingText) {
        return new Promise(
            function (resolve, reject) { // 1.
                let url = 'https://api.giphy.com' + '/v1/gifs/random?api_key=' + 'XWxOkxFs0jat2BLfARiP2WSKR4WViBMu' + '&tag=' + searchingText;  // 2.
                let xhr = new XMLHttpRequest();  // 3.
                xhr.open('GET', url);
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        let data = JSON.parse(xhr.responseText).data; // 4.
                        let gif = {  // 5.
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                        };
                        resolve(gif);  // 6.
                    }
                    reject(new Error(this.statusText));
                    console.log(`statusText=${this.statusText}`);
                };
                xhr.onerror = function () {
                    reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));
                    console.log(`statusText=${this.statusText}`);
                };
                xhr.send();
            }
        );
    },

    render: function () {
        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };
        return (
            <div style={styles}>
                <h1>Wyszukiwarka GIFów!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch} />
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        );
    }
});