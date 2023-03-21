import {IUser} from "@/types/User.interface";

export interface IVideo {
  secondCategoryId: string;
  tagId: string;
  id: string;
  user: IUser;
  isActive: boolean;
  updated_at: string;
  createdAt: string;
  title: string;
  subTitle: string;
  comments: Comment[];

}
interface Comment {
  id: string;
  comment: string;
}
