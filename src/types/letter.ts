export interface ILetterListProps {
  id: number;
  postUserNickName: string;
  createdAt: string;
  readCheck: boolean;
}

export interface ILetterDetailProps {
  id: number;
  postTitle: string;
  postContent: string;
  postLastContent: string;
  postUserNickName: string;
  firstView: string;
  latestView: string;
  favoriteView: string;
  readCheck: boolean;
  createdAt: string;
}
