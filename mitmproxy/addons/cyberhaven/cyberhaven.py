from mitmproxy import dns

class MainCyberhaven:
    def response(self, flow):
        flow.response.headers["ch"] = "processed"

    def dns_response(self, flow: dns.DNSFlow):
        if flow.request.question.type == 28:
            flow.response.answers = []
            