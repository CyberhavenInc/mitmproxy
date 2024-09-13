class MainCyberhaven:
    def __init__(self):
        pass

    def response(self, flow):
        flow.response.headers["CH"] = "processed"
