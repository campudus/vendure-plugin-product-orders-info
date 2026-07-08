import { ProductOrdersInfoPlugin } from "../ProductOrdersInfoPlugin";
import { ProductOrdersInfoService } from "../service/ProductOrdersInfoService";
import {
  bootstrapPluginSmokeServer,
  createPluginSmokeEnvironment,
  expectPluginRegistered,
} from "../../__tests__/smoke-test-utils";

describe("ProductOrdersInfoPlugin smoke", () => {
  const plugin = ProductOrdersInfoPlugin.init();
  const { server } = createPluginSmokeEnvironment(plugin);

  beforeAll(async () => {
    await bootstrapPluginSmokeServer(server);
  });

  afterAll(async () => {
    await server.destroy();
  });

  it("registers plugin and service", () => {
    expectPluginRegistered(plugin, server);
    expect(server.app.get(ProductOrdersInfoService)).toBeDefined();
  });
});
