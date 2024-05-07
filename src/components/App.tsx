import Background from './Background';
import Container from './Container';
import Footer from './Footer';
import Header from './Header';
import { useState } from 'react';
import Logo from './Logo';
import BookmarksButton from './BookmarksButton';
import SearchForm from './SearchForm';
import Sidebar from './Sidebar';
import JobItemContent from './JobItemContent';
import ResultsCount from './ResultsCount';
import SortingControls from './SortingControls';
import JobList from './JobList';
import PaginationControls from './PaginationControls';
import { useActiveId, useJobItem, useJobItems } from '../lib/hooks';

function App() {
  const [searchText, setSearchText] = useState('');
  const [jobItemsSliced, isLoading] = useJobItems(searchText);
  const activeId = useActiveId();
  const jobItem = useJobItem(activeId);

  return (
    <>
      <Background />
      <Header>
        <div className="header__top">
          <Logo />
          <BookmarksButton />
        </div>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar>
          <div className="sidebar__top">
            <ResultsCount />
            <SortingControls />
          </div>
          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
