import {IChannel} from "@/types/Channel.interface";
import {Button} from "@/components/ui/button";

export const Channel = ({ avatar, login, email }: IChannel, status: boolean) => {
  return <div className={""}>
    <img src={avatar} alt="avatarChannel"/>
    <div>
      <h1>{login}</h1>
      <p>email</p>
    </div>
    { status ? <div><Button onClick={() => {}}>Подписаться</Button></div> : <div><Button onClick={() => {}}>Отписаться</Button></div>}
  </div>;
}
