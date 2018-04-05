import React, { Component } from 'react'
import axios from 'axios'
import {
  DataView,
  DataViewLayoutOptions
} from 'primereact/components/dataview/DataView';
import { SelectButton } from 'primereact/components/selectbutton/SelectButton';
import { Toolbar } from 'primereact/components/toolbar/Toolbar';


export default class SamplePage extends Component {

  sortingOptions = [
    { label: 'Title ASC', field: 'title', order: 1 },
    { label: 'Title DSC', field: 'title', order: -1 },
    { label: 'URL ASC', field: 'url', order: 1  },
    { label: 'URL DSC', field: 'url', order: -1  },
  ]

  constructor(props) {
    super(props);

    this.state = {
      records: [],
      sortingOption: null,
    }
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(response => {
        const records = response.data.map(item => ({title: item.title, url: item.url}))
        this.setState({ records: records })
      })
  }

  renderItemTemplate(item) {

    return (
      <div className="ui-g">
        <div className="ui-g-6">{ item.title }</div>
        <div className="ui-g-6">{ item.url }</div>
      </div>
    )
  }

  onSortSelectChange(event) {
    this.setState({
      sortingOption: event.value
    })
  }

  render() {

    return (
      <div>
        <Toolbar>
          <h2>Sorting: </h2>
          <SelectButton
            value={this.state.sortingOption}
            options={this.sortingOptions}
            optionLabel={'label'}
            onChange={this.onSortSelectChange.bind(this)} 
          />
        </Toolbar>
        <DataView
          value={this.state.records}
          itemTemplate={this.renderItemTemplate.bind(this)}
          paginator={true}
          rows={10}
          sortOrder={this.state.sortingOption ? this.state.sortingOption.order : null}
          sortField={this.state.sortingOption ? this.state.sortingOption.field : null} />
      </div>
    )
  }
}