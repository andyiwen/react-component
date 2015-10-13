export default class DropDown extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options: props.options,
            value: props.value,
            unfold: false,
        }
    }

    selectChange(val){
        this.setState({
            value: val, 
        }, () => {
            if (typeof this.props.onChange === 'function') this.props.onChange(val);
            this.setState({
                unfold: false, 
            });
        });
    }

    toggleDropDown(e){
        this.setState({
            unfold: !this.state.unfold, 
        });
        e.stopPropagation();
    }

    formatDrop(){
        const [labelName = 'name', valueName = 'value'] = [this.props.labelName, this.props.valueName];
        let optionNodes = [], selected, label = this.props.placeHolder;

        for (let pair of this.state.options){
            selected = this.state.value === pair[valueName];
            if(selected) label = pair[labelName];
                optionNodes.push(<DropDown.Option key={pair[valueName]} onChange={this.selectChange.bind(this)} selected={selected} storeValue={pair[valueName]}>{pair[labelName]}</DropDown.Option>)
        }

        return <div>
                    {this.formatDropBar(label)}
                    {this.formatDropList(optionNodes)}
                </div>
    }
    
    formatDropList(nodes){
        return this.state.unfold ? <ul>{nodes}</ul> : null;
    }

    formatDropBar(label){
        let node = !this.props.search ? 
                        <DropDown.searchBar className="searchBar">{label}</DropDown.searchBar> :
                        <DropDown.label>{label}</DropDown.label>;

        return <div onClick={this.toggleDropDown.bind(this)}>
                    {node}
                </div>
    }

	render() {
		return (
            this.formatDrop()
		);
	}
}

DropDown.defaultProps = { placeHolder: 'click to select...' }

DropDown.Option = React.createClass({
    handleClick(){
        this.props.onChange(this.props.storeValue);
    },

    render(){
        let node = this.props.selected ? <i>√</i> : null;
        return (
            <div onClick={this.handleClick}>
                {this.props.children}
                {node}
            </div>
        );
    }
});

DropDown.label = React.createClass({
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});


DropDown.searchBar = React.createClass({
    getInitialState: function() {
        return {
            searchText: null,
        };
    },

    getDefaultProps: function() {
        return {
            placeHolder: 'search...'
        };
    },

    render() {
        return (
            <div>
                <div>
                    <input type="text" style={{width: '200px', height:'20px'}} placeholder={this.props.placeHolder}/>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

