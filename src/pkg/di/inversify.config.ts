import { Container, BindingScopeEnum } from "inversify";

import IDollRepo from "@/repository/doll/interface";
import ISkinRepo from "@/repository/skin/interface";
import DollRepo from "@/repository/doll/main";
import SkinRepo from "@/repository/skin/main";
import IDollService from "@/service/doll/interface";
import ISkinService from "@/service/skin/interface";
import DollService from "@/service/doll/main";
import SkinService from "@/service/skin/main";

const container = new Container({
  autoBindInjectable: true,
  defaultScope: BindingScopeEnum.Singleton
});
container.bind<IDollRepo>("IDollRepo").to(DollRepo);
container.bind<ISkinRepo>("ISkinRepo").to(SkinRepo);
container.bind<IDollService>("IDollService").to(DollService);
container.bind<ISkinService>("ISkinService").to(SkinService);

export default container;
