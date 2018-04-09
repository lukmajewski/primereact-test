import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import './SamplePage.css'
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

    const StyledToolbar = styled(Toolbar)`
      background: pink;
      padding: 2em;
    `

    const StyledSelectButton = styled(SelectButton)`
      background: yellow;

      .ui-button-text {
        color: red;
      }
    `

    return (
      <div>
        <StyledToolbar>
          <h2>Sorting: </h2>
          <StyledSelectButton
            value={this.state.sortingOption}
            options={this.sortingOptions}
            optionLabel={'label'}
            onChange={this.onSortSelectChange.bind(this)} 
          />
        </StyledToolbar>
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