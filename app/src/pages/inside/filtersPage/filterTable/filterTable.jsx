import { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { PaginationToolbar } from 'components/main/paginationToolbar';
import { ADMINISTRATOR, PROJECT_MANAGER } from 'common/constants/projectRoles';
import { FilterTableItem } from './filterTableItem';
import { FilterTableHeader } from './filterTableHeader';
import styles from './filterTable.scss';

const cx = classNames.bind(styles);

const canDeleteFilter = (item, role, userId) =>
  role === ADMINISTRATOR || role === PROJECT_MANAGER || userId === item.owner;

export class FilterTable extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    activePage: PropTypes.number,
    itemCount: PropTypes.number,
    pageCount: PropTypes.number,
    pageSize: PropTypes.number,
    onChangePage: PropTypes.func,
    onChangePageSize: PropTypes.func,
    userId: PropTypes.string,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    userFilters: PropTypes.arrayOf(PropTypes.string),
    toggleDisplayFilterOnLaunches: PropTypes.func,
    projectRole: PropTypes.string,
  };

  static defaultProps = {
    data: [],
    activePage: 1,
    itemCount: 0,
    pageCount: 0,
    pageSize: 20,
    userId: '',
    onChangePage: () => {},
    onChangePageSize: () => {},
    onDelete: () => {},
    onEdit: () => {},
    userFilters: [],
    toggleDisplayFilterOnLaunches: () => {},
    projectRole: '',
  };

  render() {
    return (
      <Fragment>
        <div className={cx('filter-table')}>
          <FilterTableHeader />
          {this.props.data.map((item) => (
            <FilterTableItem
              key={item.id}
              name={item.name}
              description={item.description}
              owner={item.owner}
              options="(TBD)"
              shared={item.share}
              showOnLaunches={this.props.userFilters.indexOf(item.id) !== -1}
              editable={item.owner === this.props.userId}
              onDelete={() => this.props.onDelete(item)}
              onEdit={() => this.props.onEdit(item)}
              onChangeDisplay={() => this.props.toggleDisplayFilterOnLaunches(item.id)}
              canBeDeleted={canDeleteFilter(item, this.props.projectRole, this.props.userId)}
            />
          ))}
        </div>
        <div className={cx('filter-table-pagination')}>
          <PaginationToolbar
            activePage={this.props.activePage}
            itemCount={this.props.itemCount}
            pageCount={this.props.pageCount}
            pageSize={this.props.pageSize}
            onChangePage={this.props.onChangePage}
            onChangePageSize={this.props.onChangePageSize}
          />
        </div>
      </Fragment>
    );
  }
}