const testXformHelper = require('../test-xform-helper');

const FilterColumnXform = verquire('xlsx/xform/table/filter-column-xform');

const expectations = [
  {
    title: 'showing filter',
    create() {
      return new FilterColumnXform();
    },
    initialModel: {filterButton: true},
    preparedModel: {colId: '0', filterButton: true},
    xml: '<filterColumn colId="0" hiddenButton="0" />',
    get parsedModel() {
      return this.initialModel;
    },
    tests: ['prepare', 'render', 'renderIn', 'parse'],
    options: {index: 0},
  },
  {
    title: 'hidden filter',
    create() {
      return new FilterColumnXform();
    },
    initialModel: {filterButton: false},
    preparedModel: {colId: '1', filterButton: false},
    xml: '<filterColumn colId="1" hiddenButton="1" />',
    get parsedModel() {
      return this.initialModel;
    },
    tests: ['prepare', 'render', 'renderIn', 'parse'],
    options: {index: 1},
  },
  {
    title: 'with custom filter',
    create() {
      return new FilterColumnXform();
    },
    initialModel: {filterButton: false, customFilters: [{val: '*brandywine*'}]},
    preparedModel: {
      colId: '0',
      filterButton: false,
      customFilters: [{val: '*brandywine*'}],
    },
    xml: '<filterColumn colId="0" hiddenButton="1"><customFilters><customFilter val="*brandywine*"/></customFilters></filterColumn>',
    get parsedModel() {
      return this.initialModel;
    },
    tests: ['prepare', 'render', 'renderIn', 'parse'],
    options: {index: 0},
  },
  {
    // Unsupported filter types must not break parsing. They are not rendered
    // back out, so this is parse-only.
    title: 'with unsupported filter types',
    create() {
      return new FilterColumnXform();
    },
    xml: '<filterColumn colId="0" hiddenButton="0"><top10 top="0" val="10" filterVal="1800"/><dynamicFilter type="aboveAverage" val="14.5"/><colorFilter dxfId="0" cellColor="1"/><extLst><ext uri="{XYZ}"><x14:filter val="1"/></ext></extLst></filterColumn>',
    parsedModel: {filterButton: true},
    tests: ['parse'],
    options: {index: 0},
  },
];

describe('FilterColumnXform', () => {
  testXformHelper(expectations);
});
