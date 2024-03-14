{
  description = "Nodejs development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
  };

  outputs = { self, nixpkgs }:
    let
      supportedSystems = [ "x86_64-linux" ];
      forAllSystems = f: nixpkgs.lib.genAttrs supportedSystems (system: f system);
    in
    {
      devShells = forAllSystems
        (system:
          let
            pkgs = import nixpkgs {
              inherit system;
            };
          in
          {
            default = with pkgs; mkShell
              ({
                shellHook = ''
                  zellij
                '';
                packages = [
                  nodejs
                  yarn
                ];
              });
          }
        );
    };
}
